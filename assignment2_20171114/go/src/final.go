package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"strconv"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	// If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error
var check int

type Person struct {
	ID       uint   `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Admin    int    `json:"admin"`
}
type Check struct {
	Email string `json:"email"`
	Check int    `json:"check"`
}

type PersonLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Mail struct {
	senderId string
	toIds    []string
	subject  string
	body     string
}

type SmtpServer struct {
	host string
	port string
}

type SingleCorrect struct {
	QuestionID uint   `json:"id"`
	Option4    string `json:"option4"`
	Option1    string `json:"option1"`
	Option2    string `json:"option2"`
	Option3    string `json:"option3"`
	Question   string `json:"question"`
	QuizGenre  string `json:"genre"`
	Answer     string `json:"answer"`
}

type MultiCorrect struct {
	QuestionID    uint   `json:"id"`
	Option1       string `json:"option1"`
	Option2       string `json:"option2"`
	Option3       string `json:"option3"`
	Option4       string `json:"option4"`
	Question      string `json:"question"`
	QuizGenre     string `json:"genre"`
	AnswerOption1 int    `json:"answeroption1"`
	AnswerOption2 int    `json:"answeroption2"`
	AnswerOption3 int    `json:"answeroption3"`
	AnswerOption4 int    `json:"answeroption4"`
}

type Genre struct {
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	HighestScore int    `json:"hscore"`
}

type UpdateS struct {
	Genre string `json:"genre"`
	Score int    `json:"score"`
}

type Userhistory struct {
	Name  string `json:"name"`
	Genre string `json:"genre"`
	Score int    `json:"score"`
}

func (s *SmtpServer) ServerName() string {
	return s.host + ":" + s.port
}

func (mail *Mail) BuildMessage() string {
	message := ""
	message += fmt.Sprintf("From: %s\r\n", mail.senderId)
	if len(mail.toIds) > 0 {
		message += fmt.Sprintf("To: %s\r\n", strings.Join(mail.toIds, ";"))
	}

	message += fmt.Sprintf("Subject: %s\r\n", mail.subject)
	message += "\r\n" + mail.body

	return message
}

/*var single = []SingleCorrect{
SingleCorrect{1, "Stumpy", "Stodge", "Helium Bat", "Tubby", "Former Australian captain Mark Taylor has had several nicknames over his playing career. Which of the following was NOT one of them?", "Sports", "Stumpy"},
SingleCorrect{2, "Sri Lanka", "Canada", "Zimbabwe", "East Africa", "Which was the 1st non Test playing country to beat India in an international match?", "Sports", "Sri Lanka"},
SingleCorrect{3, "Four", "Three", "Two", "Eight", "Track and field star Carl Lewis won how many gold medals at the 1984 Olympic games?", "Sports", "Four"},
SingleCorrect{4, "Kamaljit Sandhu", "P.T.Usha", "M.L.Valsamma", "K.Malleshwari", "Who is the first Indian woman to win an Asian Games gold in 400m run?", "Sports", "Kamaljit Sandhu"},
SingleCorrect{5, "Punter", "Ponter", "Ponts", "The Rickster", "Ricky Ponting is also known as what?", "Sports", "Punter"},
SingleCorrect{6, "Taikuchi and Higana", "Gellus and Mello", "Ryuk and Rem", "Light and Misa", "What is the name of the 2 Shinigami first shown in the Anime Death Note?", "Anime", "Ryuk and Rem"},
SingleCorrect{7, "Kakashi", "Jiraiya", "Iruka", " Sarutobi", "Who was Naruto's teacher at the ninja academy?", "Anime", "Iruka"},
SingleCorrect{8, "Sunagakure", "Konohagakure", "Amegakure", "Yukigakure", "What village does Naruto belong to?", "Anime", "Konohagakure"},
SingleCorrect{9, "Neji vs Gaara", "Shikamaru vs Temari", "Naruto vs Kankuro", "Sasuke vs Shino", "Who went against who in the last round of the chunin exams?", "Anime", "Shikamaru vs Temari"},
SingleCorrect{10, "Nekomata", "Kyuubi", "Genbi", "Shukaku", "What is the name of the Biju inside Gaara?", "Anime", "Shukaku"},
SingleCorrect{11, "Ultimate Avengers", "The Justice League", "The X-Men", "The Fantastic 4", "Which Super Hero Team Does Johnny Storm Belong To?", "Marvel", "The Fantastic 4"},
SingleCorrect{12, "The Flash", "Hancock", "Spider-man", "Superman", "Which Hero Are From Marvel?", "Marvel", "Spider-man"},
SingleCorrect{13, "Stark Tower", "Fantastic Headquarters", "Baxter Building", "Xavier Institute", "The Fantastic Four have the headquarters in what building?", "Marvel", "Fantastic Headquarters"},
SingleCorrect{14, "The Daily Planet", "The Daily Bugle", "The New York Times", "The Rolling Stone", "Peter Parker works as a photographer for:", "Marvel", "The Daily Bugle"},
SingleCorrect{15, "World War I", "World War II", "Cold War", "American Civil War", "Captain America was frozen in which war?", "Marvel", "World War II"},
}*/

/*var multi = []MultiCorrect{
	MultiCorrect{1, "India", "Pakistan", "Austrailia", "England", "Which of the following teams have not won a world cup?", "Sports", 1, 1, 1, 0},
	MultiCorrect{2, "India", "Afganisthan", "West-Indies", "Hong-kong", "Which countries play cricket?", "Sports", 1, 1, 1, 1},
	MultiCorrect{3, "Jiraiya", "Iruka", "Kakashi", "Madara", "Who all taught Naruto?", "Anime", 1, 1, 1, 0},
	MultiCorrect{4, "Nagato Uzumaki", "Minato Uzumaki", "Madara", "Orochimaru", "Who killed Jiraiya-sama?", "Anime", 1, 0, 0, 0},
	MultiCorrect{5, "Tony-Stark", "Thor", "Wanda", "T'Challa", "Who are the original members of the Avengers?", "Marvel", 1, 1, 0, 0},
	MultiCorrect{6, "Odin", "Thor", "Bruce Banner", "Loki", "Which of these are Asgardians?", "Marvel", 1, 1, 0, 1},
}*/

/*var genre = []Genre{
Genre{1, "Sports", 0},
Genre{2, "Anime", 0},
Genre{3, "Marvel", 0},
}*/

func main() {

	db, err = gorm.Open("sqlite3", "./user_info.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Person{})
	db.AutoMigrate(&SingleCorrect{})
	db.AutoMigrate(&Genre{})
	db.AutoMigrate(&MultiCorrect{})
	db.AutoMigrate(&Userhistory{})
	r := gin.Default()
	r.Use((cors.Default()))
	/*store := sessions.NewCookieStore([]byte("secret"))
	r.Use(sessions.Sessions("mysession", store))*/
	r.POST("/login", login)

	//r.GET("/logout", logout)
	/*r.GET("/people/", GetPeople) // Creating routes for each functionality
	r.GET("/people/:id", GetPerson)
	r.POST("/people", CreatePerson)
	r.PUT("/people/:id", UpdatePerson)
	r.DELETE("/people/:id", DeletePerson)
	r.Use((cors.Default()))

	r.POST("/people/login", LoginPerson) // Run on port 8080*/
	r.GET("/getallusers", GetAllUsers)
	r.DELETE("/getallusers/:id", DeleteUser)
	r.POST("/updatescore", UpdateScore)
	r.POST("/updatehistory", UpdateHistory)
	r.GET("/getgenres", GetGenres)
	r.GET("/quiz/:genre", DisplayQuestions)
	r.GET("/quiz2/:genre", DisplayQuestionsMulti)
	r.POST("/makeadmin/:id", MakeAdmin)
	r.POST("/createquiz", Createquiz)
	r.POST("/createquizmulti", Createquizmulti)
	r.POST("/creategenre", Creategenre)
	r.GET("/getallquiz", GetAllQuiz)
	r.DELETE("/getallquiz/:id", DeleteQuiz)
	r.DELETE("/getallquizmulti/:id", DeleteQuizMulti)
	r.GET("/getallquizmulti", GetAllQuizMulti)
	r.GET("/gethistory", GetHistory)
	people := r.Group("/people")
	{

		people.GET("/:email", GetDetails)
		people.POST("/signup_check", JokeHandler)
		people.POST("/signup", CreateUser)
		//people.POST("/login", LikeJoke)
	}

	r.Run(":8080")

}

func GetHistory(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var single []Userhistory
	if err := db.Find(&single).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, single)
	}
}

func UpdateHistory(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var history Userhistory
	var search Userhistory
	c.BindJSON(&history)

	err := db.Where("name = ? and genre = ? and score = ?", history.Name, history.Genre, history.Score).Find(&search).Error

	if err != nil {
		fmt.Println(err)
		db.Save(&history)
	} else {
		c.AbortWithStatus(404)
	}

}

func DeleteQuizMulti(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	id := c.Params.ByName("id")
	var person MultiCorrect
	d := db.Where("question_id = ?", id).Delete(&person)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func GetAllQuizMulti(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var single []MultiCorrect
	if err := db.Find(&single).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, single)
	}

}

func Createquizmulti(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var quiz MultiCorrect
	var search Genre

	c.BindJSON(&quiz)
	err := db.Where("name = ?", quiz.QuizGenre).Find(&search).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		db.Save(&quiz)
	}
}

func DisplayQuestionsMulti(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	name_of_genre := c.Params.ByName("genre")
	fmt.Println(name_of_genre)
	var multi []MultiCorrect
	err := db.Find(&multi).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		//fmt.Println(person.Name)
		//fmt.Println(single[0].Answer)
		c.JSON(200, multi)
	}

}

func DeleteQuiz(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	id := c.Params.ByName("id")
	var person SingleCorrect
	d := db.Where("question_id = ?", id).Delete(&person)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func GetAllQuiz(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var single []SingleCorrect
	if err := db.Find(&single).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, single)
	}

}

func Creategenre(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var insert Genre
	var search Genre
	c.BindJSON(&insert)
	err := db.Where("name = ?", insert.Name).First(&search).Error

	if err != nil {
		db.Save(&insert)
		fmt.Println(err)
	} else {
		fmt.Println("hello")

		c.AbortWithStatus(404)
	}
}

func Createquiz(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var quiz SingleCorrect
	var search Genre

	c.BindJSON(&quiz)
	err := db.Where("name = ?", quiz.QuizGenre).Find(&search).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		db.Save(&quiz)
	}

}
func MakeAdmin(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	id := c.Params.ByName("id")
	var output Person

	err := db.Where("id = ?", id).Find(&output).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {

		/*var temp int
		temp = upd.Score
		fmt.Println(temp)
		if temp > output.HighestScore {
			output.HighestScore = temp
			db.Save(&output)
		}*/

		output.Admin = 1
		db.Save(&output)

		//c.AbortWithStatus(200)
	}
}

func DeleteUser(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func GetAllUsers(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}

}

func DisplayQuestions(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	name_of_genre := c.Params.ByName("genre")
	fmt.Println(name_of_genre)
	var single []SingleCorrect
	err := db.Find(&single).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		//fmt.Println(person.Name)
		//fmt.Println(single[0].Answer)
		c.JSON(200, single)
	}
}

func GetGenres(c *gin.Context) {
	var genre []Genre
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		//fmt.Println(genre[0].HighestScore)
		// Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, genre)
	}
}

func UpdateScore(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	var upd UpdateS
	c.BindJSON(&upd)

	fmt.Println(upd.Genre)
	var output Genre

	err := db.Where("name = ?", upd.Genre).Find(&output).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(output.HighestScore)
		var temp int
		temp = upd.Score
		fmt.Println(temp)
		if temp > output.HighestScore {
			output.HighestScore = temp
			db.Save(&output)
		}

		//c.AbortWithStatus(200)
	}

}

func GetDetails(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	email := c.Params.ByName("email")
	fmt.Println(email)
	var person Person
	err := db.Where("email = ?", email).First(&person).Error

	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		// Why am I doing this? Find out. Try running with this line commented
		//fmt.Println(person.Name)
		c.JSON(200, person)
	}
}

/*var person []Person
if err := db.Find(&person).Error; err != nil {
	c.AbortWithStatus(404)
	fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		fmt.Println(person[0].Name)
		c.JSON(200, person)
		}*/

func JokeHandler(c *gin.Context) {
	//var person Person
	c.Header("access-control-allow-origin", "*")
	var check Check
	c.BindJSON(&check)

	//db.Create(&person)
	// Why am I doing this? Find out. Try running with this line commented

	mail := Mail{}
	mail.senderId = "batragaurav2616@gmail.com"
	mail.toIds = []string{check.Email}
	mail.subject = "Verification code"
	mail.body = "Your verification code is " + strconv.Itoa(check.Check)

	messageBody := mail.BuildMessage()

	smtpServer := SmtpServer{host: "smtp.gmail.com", port: "465"}

	log.Println(smtpServer.host)
	//build an auth
	auth := smtp.PlainAuth("", mail.senderId, "19682616", smtpServer.host)

	// Gmail will reject connection if it's not secure
	// TLS config
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpServer.host,
	}

	conn, err := tls.Dial("tcp", smtpServer.ServerName(), tlsconfig)
	if err != nil {
		log.Panic(err)
	}

	client, err := smtp.NewClient(conn, smtpServer.host)
	if err != nil {
		log.Panic(err)
	}

	// step 1: Use Auth
	if err = client.Auth(auth); err != nil {
		log.Panic(err)
	}

	// step 2: add all from and to
	if err = client.Mail(mail.senderId); err != nil {
		log.Panic(err)
	}
	for _, k := range mail.toIds {
		if err = client.Rcpt(k); err != nil {
			log.Panic(err)
		}
	}

	// Data
	w, err := client.Data()
	if err != nil {
		log.Panic(err)
	}

	_, err = w.Write([]byte(messageBody))
	if err != nil {
		log.Panic(err)
	}

	err = w.Close()
	if err != nil {
		log.Panic(err)
	}

	client.Quit()

	log.Println("Mail sent successfully")

	//c.JSON(200)
}

func CreateUser(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")

	var person Person
	var person2 Person
	c.BindJSON(&person)
	err := db.Where("name = ?", person.Name).First(&person2).Error
	err2 := db.Where("email=?", person.Email).First(&person2).Error
	//db.Create(&person)
	if err != nil && err2 != nil {
		//fmt.Println("in")
		db.Create(&person)

	} else {
		c.AbortWithStatus(404)
		//fmt.Println(err)
	}
	/*c.BindJSON(&person)
	db.Create(&person)
	c.Header("access-control-allow-origin", "*")*/

}

func login(c *gin.Context) {
	c.Header("access-control-allow-origin", "*")
	//session := sessions.Default(c)
	var logger Person
	var person Person
	c.BindJSON(&logger)
	/*for i := 0; i < len(multi); i++ {
		db.Create(&multi[i])
	}*/
	/*for i := 0; i < len(genre); i++ {
	db.Create(&genre[i])
	}*/

	//username := logger.Email
	//password := logger.Password
	//fmt.Println(username)

	err := db.Where("email=? and password=?", logger.Email, logger.Password).First(&person).Error

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Unsuccessfull"})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user"})
	}

}
