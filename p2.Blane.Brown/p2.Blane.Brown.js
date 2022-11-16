// Blane Brown - Project 2

class Drag {

    constructor() {
        this.dragging = false
        this.mouseOver = false
    }

    MouseOver() {
        if (mouseX > this.lp - 10 && mouseX < this.lp + 370 && mouseY > this.tp - 72 && mouseY < this.tp - 36) {
            return true
        }

    }

    update() {
        if (this.dragging) {
            this.lp = mouseX + this.offsetX;
            this.tp = mouseY + this.offsetY;
        }

    }

    pressed() {
        if (mouseX > this.lp - 10 && mouseX < this.lp + 370 && mouseY > this.tp - 72 && mouseY < this.tp - 36) {
            this.dragging = true;
            this.offsetX = this.lp - mouseX;
            this.offsetY = this.tp - mouseY;
        }
    }

    released() {
        this.dragging = false;
    }
}

class Calendar extends Drag {
    constructor(topPos, leftPos) {
        super()
        this.tp = topPos
        this.lp = leftPos
        this.color = colorTheme
    }

    display() {
        noStroke()
        this.color = colorTheme
        super.MouseOver() ? fill(230) : fill(this.color)
        rect(this.lp - 10, this.tp - 72, 380, 70, 12)
        fill(200)
        rect(this.lp - 10, this.tp - 36, 380, 100, 0, 0, 12, 12)
        super.MouseOver() ? fill(this.color) : fill(230)
        textFont('Helvetica')
        textSize(20)
        textStyle("bold")
        text("Date and Time", this.lp, this.tp - 46)
        textStyle("normal")
        fill(0)
        textSize(30)

        // Date and time
        let today = new Date()
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let date = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`
        text(date, this.lp, this.tp - 4)
        textSize(52)
        textStyle("bold")
        let time = `${(today.getHours() > 12) ? today.getHours() - 12 : today.getHours()}:${today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()}${today.getHours() > 12 ? "pm" : "am"}`
        if (today.getHours() == 0) {
            time = time.substring(time.indexOf("0") + 1)
            time = "12" + time
        }
        text(time, this.lp, this.tp + 48)
    }

}

class Reminders extends Drag {
    constructor(topPos, leftPos) {
        super()
        this.tp = topPos
        this.lp = leftPos
        this.color = colorTheme
        this.events = []

        fetch("./data/calendar.json")
            .then(Response => Response.json())
            .then(data => {
                this.events = data
            });
    }

    display() {

        // create event container
        this.color = colorTheme
        super.MouseOver() ? fill(230) : fill(this.color)
        rect(this.lp - 10, this.tp - 72, 380, 70, 12)
        fill(200)
        rect(this.lp - 10, this.tp - 36, 380, 55 * this.events.length, 0, 0, 12, 12)
        super.MouseOver() ? fill(this.color) : fill(230)
        textFont('Helvetica')
        textSize(20)
        textStyle("bold")
        text("Today's Events", this.lp, this.tp - 46)
        textStyle("normal")
        textSize(20)
        fill(230)

        // event items
        let today = new Date()
        const etp = this.tp - 25
        const elp = this.lp
        const gap = 52
        let gapCount = 0

        // create a bar for each event
        this.events.map((event) => {
            fill(230)
            rect(elp, etp + (gapCount * gap), 360, 40, 12)

            let hours = event.eventTimeHour
            if (event.eventTime === "pm") {
                hours = Number(hours) + 12
            }

            if (hours < today.getHours() || (hours == today.getHours() && event.eventTimeMinutes <= today.getMinutes())) {
                fill(210, 50, 50)
                ellipse(elp + 20, etp + 20 + (gapCount * gap), 15, 15)
                fill(120)
            } else {
                fill(50, 210, 50)
                ellipse(elp + 20, etp + 20 + (gapCount * gap), 15, 15)
                fill(0)
            }

            text(`${event.eventTimeHour}:${event.eventTimeMinutes < 10 ? "0" + event.eventTimeMinutes : event.eventTimeMinutes}${event.eventTime} - ${event.eventTitle}`, elp + 40, etp + 27 + (gapCount * gap))

            gapCount++

        })


        // for (let i = 0; i < events.length; i++) {
        //     fill(230)
        //     rect(elp, etp + (i * gap), 360, 40, 12)

        //     // change cirlce color based on if event has passed or not
        //     let hours = events[i].substring(0, events[i].indexOf(":"))
        //     let minutes = events[i].substring(events[i].indexOf(":") + 1, events[i].indexOf("m") - 1)
        //     if ((events[i].substring(events[i].indexOf("m") - 1, events[i].indexOf("m") + 1)) == "pm") {
        //         hours = Number(hours) + 12
        //     }
        //     if (hours < today.getHours() || (hours == today.getHours() && minutes <= today.getMinutes())) {
        //         fill(210, 50, 50)
        //         ellipse(elp + 20, etp + 20 + (i * gap), 15, 15)
        //         fill(120)
        //     } else {
        //         fill(50, 210, 50)
        //         ellipse(elp + 20, etp + 20 + (i * gap), 15, 15)
        //         fill(0)
        //     }
        //     text(events[i], elp + 40, etp + 27 + (i * gap))
        // }

    }

}

class Health extends Drag {
    constructor(topPos, leftPos) {
        super()
        this.tp = topPos
        this.lp = leftPos
        this.color = colorTheme
        this.sleep = []

        fetch("./data/sleep.json")
            .then(Response => Response.json())
            .then(data => {
                this.sleep = data
            });
    }

    display() {

        // create health container
        this.color = colorTheme
        super.MouseOver() ? fill(230) : fill(this.color)
        rect(this.lp - 10, this.tp - 72, 380, 70, 12)
        fill(200)
        rect(this.lp - 10, this.tp - 36, 380, 348, 0, 0, 12, 12)
        super.MouseOver() ? fill(this.color) : fill(230)
        textFont('Helvetica')
        textSize(20)
        textStyle("bold")
        text("Health Information", this.lp, this.tp - 46)
        textStyle("normal")

        // sleep info
        fill(0)
        text("Sleep Statistics", this.lp, this.tp - 10)

        if (this.sleep.length != 0) {
            const lastNight = this.sleep[this.sleep.length - 1]
            const deepSleep = lastNight.deepSleep
            const remSleep = lastNight.remSleep
            const totalSleep = lastNight.totalSleep
            const lastWeekTotal = this.sleep[this.sleep.length - 2].totalSleep
            const deepLength = Math.floor((deepSleep / totalSleep) * 360)
            const remLength = Math.floor((remSleep / totalSleep) * 360)
            const lightLength = 360 - deepLength - remLength

            // sleep stats container
            fill(230)
            rect(this.lp, this.tp + 38, 360, 132, 12)

            // light sleep
            fill("#6e2e99")
            rect(this.lp, this.tp + 5, lightLength, 20, 8, 0, 0, 8)
            ellipse(this.lp + 20, this.tp + 65, 15, 15)
            // deep sleep
            fill("#162280")
            rect(this.lp + lightLength, this.tp + 5, deepLength, 20)
            ellipse(this.lp + 20, this.tp + 103, 15, 15)
            // rem sleep
            fill("#1f5891")
            rect(this.lp + lightLength + deepLength, this.tp + 5, remLength, 20, 0, 8, 8, 0)
            ellipse(this.lp + 20, this.tp + 141, 15, 15)

            fill(0)
            const deepPercent = Math.floor(((deepSleep) / totalSleep) * 100)
            text(`Deep Sleep:  ${Math.floor((deepSleep) / 60)} hrs ${(deepSleep) % 60} mins`, this.lp + 40, this.tp + 110)
            textAlign(RIGHT)
            fill("#162280")
            textStyle("bold")
            text(`${deepPercent}%`, this.lp + 350, this.tp + 110)
            textStyle("normal")
            textAlign(LEFT)
            fill(0)

            const remPercent = Math.floor(((remSleep) / totalSleep) * 100)
            text(`Rem Cycle:  ${Math.floor((remSleep) / 60)} hrs ${(remSleep) % 60} mins`, this.lp + 40, this.tp + 148)
            textAlign(RIGHT)
            fill("#1f5891")
            textStyle("bold")
            text(`${remPercent}%`, this.lp + 350, this.tp + 148)
            textStyle("normal")
            textAlign(LEFT)
            fill(0)

            const lightPercent = 100 - (deepPercent + remPercent)
            text(`Light Sleep:  ${Math.floor((totalSleep - remSleep - deepSleep) / 60)} hrs ${(totalSleep - remSleep - deepSleep) % 60} mins`, this.lp + 40, this.tp + 72)
            textAlign(RIGHT)
            fill("#6e2e99")
            textStyle("bold")
            text(`${lightPercent}%`, this.lp + 350, this.tp + 72)
            textStyle("normal")
            textAlign(LEFT)
            fill(0)

            // total sleep stats container
            fill(230)
            rect(this.lp, this.tp + 182, 360, 120, 12)

            fill(0)
            text(`Total Sleep:  ${Math.floor((totalSleep) / 60)} hrs ${(totalSleep) % 60} mins`, this.lp + 14, this.tp + 216)

            lastWeekTotal - totalSleep > 0 ? fill(210, 50, 50) : fill(50, 210, 50)
            ellipse(this.lp + 20, this.tp + 247, 15, 15)
            fill(0)

            text(`Your total time slept is ${lastWeekTotal - totalSleep > 0 ? "down" : "up"} ${Math.floor(Math.abs((lastWeekTotal - totalSleep) / lastWeekTotal) * 100)}% \n compared to last week`, this.lp + 38, this.tp + 254)
        }
    }

}

class Weather extends Drag {
    constructor(topPos, leftPos) {
        super()
        this.tp = topPos
        this.lp = leftPos
        this.color = colorTheme
        this.temp
        this.forecast
    }

    setTemp(temp) {
        this.temp = temp
    }

    setForecast(forecast) {
        this.forecast = forecast
    }

    display() {
        noStroke()
        this.color = colorTheme
        super.MouseOver() ? fill(230) : fill(this.color)
        rect(this.lp - 10, this.tp - 72, 380, 70, 12)
        fill(200)
        rect(this.lp - 10, this.tp - 36, 380, 400, 0, 0, 12, 12)
        super.MouseOver() ? fill(this.color) : fill(230)
        textFont('Helvetica')
        textSize(20)
        textStyle("bold")
        text("Weather", this.lp, this.tp - 46)
        textStyle("normal")
        fill(0)
        textSize(30)

        text("Lubbock, Texas", this.lp, this.tp - 4)
        textSize(52)
        textStyle("bold")
        if (this.temp != undefined) {
            text(`${this.temp}°F`, this.lp, this.tp + 48)
        } else {
            text("Loading", this.lp, this.tp + 48)
        }

        fill(230)
        rect(this.lp, this.tp + 60, 360, 294, 12)
        textSize(20)

        const days = ["Today", "This Afternoon", "Overnight", "Tonight", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const etp = this.tp + 60
        const elp = this.lp
        const gap = 42
        let gapCount = 0
        fill(0)

        textStyle("normal")
        if (this.forecast != undefined) {
            for (let i = 0; i < this.forecast.length; i++) {
                if (gapCount > 6) {
                    break
                }
                if (days.includes(forecast[i].name)) {
                    textStyle("bold")
                    if (forecast[i].name == "Today" || forecast[i].name == "This Afternoon") {
                        text("Today", elp + 10, etp + 27 + (gapCount * gap))
                    } else if ((forecast[i].name == "Tonight" || forecast[i].name == "Overnight") && !(forecast.some(e => e.name === "Today")) && !(forecast.some(e => e.name === "This Afternoon"))) {
                        text("Tonight", elp + 10, etp + 27 + (gapCount * gap))
                    } else if ((forecast[i].name != "Tonight" && forecast[i].name != "Overnight")) {
                        text(forecast[i].name.substring(0, 3), elp + 10, etp + 27 + (gapCount * gap))
                    } else {
                        continue
                    }
                    textStyle("normal")

                    // get high and low events[i].indexOf("m") - 1, events[i].indexOf("m") + 1)
                    const high = forecast[i].temperature
                    const low = forecast[i + 1].temperature

                    if (forecast[i].name != "Tonight" && forecast[i].name != "Overnight") {
                        fill("#5fb1e8")
                        text(`${low}°`, elp + 105, etp + 27 + (gapCount * gap))
                        fill(0)
                    }
                    text(`${high}°`, elp + 145, etp + 27 + (gapCount * gap))
                    textAlign(RIGHT)
                    text(`${forecast[i + 1].shortForecast}`, elp + 350, etp + 27 + (gapCount * gap))
                    textAlign(LEFT)
                    gapCount++
                }
            }
        }
    }

}

class News extends Drag {
    constructor(topPos, leftPos) {
        super()
        this.tp = topPos
        this.lp = leftPos
        this.color = colorTheme
        this.news = []
        this.story = {
            "id": "1",
            "source": "BBC News",
            "publishTime": "17 hours ago",
            "story": "Texas has experienced historically \n drastic drops in temperature over the \n years the most notorious being the \n Great Blizzard of 1899."
        }
        this.rotate = 0

        fetch("./data/news.json")
            .then(Response => Response.json())
            .then(data => {
                this.news = data
            });
    }

    display() {

        // create container
        this.color = colorTheme
        super.MouseOver() ? fill(230) : fill(this.color)
        rect(this.lp - 10, this.tp - 72, 380, 70, 12)
        fill(200)
        rect(this.lp - 10, this.tp - 36, 380, 395, 0, 0, 12, 12)
        super.MouseOver() ? fill(this.color) : fill(230)
        textFont('Helvetica')
        textSize(20)
        textStyle("bold")
        text("News", this.lp, this.tp - 46)
        textStyle("normal")
        textSize(20)
        fill(230)

        rect(this.lp, this.tp, 360, 40, 12)

        // news info setup
        image(img[this.rotate], this.lp, this.tp - 25, 360, 200);
        rect(this.lp, this.tp + 185, 360, 163, 12)
        image(logo[this.rotate], this.lp + 10, this.tp + 184 + 10, 40, 40);
        fill(0)
        text(`${this.story.source} • ${this.story.publishTime}`, this.lp + 60, this.tp + 221)
        text(`${this.story.story}`, this.lp + 10, this.tp + 260)

    }

    loadStory() {
        if (this.rotate == this.news.length - 1) {
            this.rotate = 0
        } else {
            this.rotate = this.rotate + 1
        }
        this.story = this.news[this.rotate]
    }

}


// Drawing begins
let calendar
let reminders
let health
let news

// Weather variabiles
let weather
let temp
let forecast

// news variables
let img = []
let logo = []

let capture

// color select variables
let colorTheme = "#3399ff"
let colorToggle = false
colorSelect = "#e6e6e6"
let colorLogo

function setup() {
    createCanvas(1920, 1080)
    // load news images 
    img[0] = loadImage('assets/city.jpg')
    logo[0] = loadImage('assets/bbc.png')
    img[1] = loadImage('assets/plane.jpg')
    logo[1] = loadImage('assets/abc.png')
    img[2] = loadImage('assets/dog.jpg')
    logo[2] = loadImage('assets/cnn.png')
    colorLogo = loadImage('assets/color.png')

    capture = createCapture(VIDEO);
    capture.size(1920, 1080);
    capture.hide();

    // Create calendar widget
    calendar = new Calendar(100, 40)

    // Create reminder widget
    reminders = new Reminders(265, 40)

    // Create health widget
    health = new Health(100, 1520)

    // Create weather widget
    temp = getTemp()
    forecast = getForecast()
    weather = new Weather(550, 40)

    // Create news widget
    news = new News(515, 1520)
    const interval = setInterval(function () {
        news.loadStory()
    }, 4000)

}

function draw() {
    background(45)
    image(capture, 0, 0, 1920, 1080);

    // Display calendar widget
    calendar.MouseOver()
    calendar.update()
    calendar.display()

    // Display reminders
    reminders.MouseOver()
    reminders.update()
    reminders.display()

    // Display health widget
    health.MouseOver()
    health.update()
    health.display()

    // Display weather widget
    weather.MouseOver()
    weather.update()
    weather.display()
    weather.setTemp(temp)
    weather.setForecast(forecast)

    // Display news widget
    news.MouseOver()
    news.update()
    news.display()

    // ColorPicker
    fill(colorSelect)
    rect(1830, 990, 60, 60, 12)
    image(colorLogo, 1835, 995, 50, 50);
    if (colorToggle) {
        fill(200)
        rect(1530, 990, 280, 60, 15)

        // color 1
        fill("#d64238")
        rect(1565, 1005, 30, 30, 15)

        // color 2
        fill("#ff9933")
        rect(1610, 1005, 30, 30, 15)

        // color 3
        fill("#3e9642")
        rect(1655, 1005, 30, 30, 15)

        // color 4
        fill("#3399ff")
        rect(1700, 1005, 30, 30, 15)

        // color 5
        fill("#ad51a9")
        rect(1745, 1005, 30, 30, 15)
    }


}

function mousePressed() {
    calendar.pressed()
    reminders.pressed()
    health.pressed()
    weather.pressed()
    news.pressed()

    // color picker controls
    if (mouseX > 1830 && mouseX < 1890 && mouseY > 990 && mouseY < 1050) {
        colorToggle = !colorToggle
        colorToggle ? colorSelect = colorTheme : colorSelect = "#e6e6e6"
    }

    if (colorToggle) {
        if (mouseX > 1565 && mouseX < 1595 && mouseY > 1005 && mouseY < 1035) {
            // color 1
            colorTheme = "#d64238"
            colorSelect = colorTheme
        } else if (mouseX > 1610 && mouseX < 1640 && mouseY > 1005 && mouseY < 1035) {
            // color 2
            colorTheme = "#ff9933"
            colorSelect = colorTheme
        } else if (mouseX > 1655 && mouseX < 1685 && mouseY > 1005 && mouseY < 1035) {
            // color 3
            colorTheme = "#3e9642"
            colorSelect = colorTheme
        } else if (mouseX > 1700 && mouseX < 1730 && mouseY > 1005 && mouseY < 1035) {
            // color 4
            colorTheme = "#3399ff"
            colorSelect = colorTheme
        } else if (mouseX > 1745 && mouseX < 1775 && mouseY > 1005 && mouseY < 1035) {
            // color 5
            colorTheme = "#ad51a9"
            colorSelect = colorTheme
        }
    }

}

function mouseReleased() {
    calendar.released()
    reminders.released()
    health.released()
    weather.released()
    news.released()
}

async function getTemp() {
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    temp = json.properties.periods[0].temperature
    //let curr_short_forecast = json.properties.periods[0].shortForecast
}

async function getForecast() {
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast');
    const json = await response.json()
    forecast = json.properties.periods

}