input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.South)
    serial.writeLine("land")
    basic.pause(1000)
})
// 2回すると上手くいく。謎。
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Heart)
    serial.writeLine("ss=" + ssid)
    basic.pause(1000)
    serial.writeLine("pass=" + pass)
    basic.pause(1500)
    serial.writeLine("ss=" + ssid)
    basic.pause(1000)
    serial.writeLine("pass=" + pass)
    basic.pause(1000)
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    basic.showIcon(IconNames.Target)
    basic.pause(200)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 4; index++) {
        basic.pause(100)
        if (input.buttonIsPressed(Button.B)) {
            basic.showIcon(IconNames.No)
            serial.writeLine("emergency")
            basic.pause(1000)
            break;
        }
    }
})
let pass = ""
let ssid = ""
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate57600
)
radio.setGroup(101)
ssid = "TELLO-" + "9A863A"
pass = ""
basic.showString(ssid.substr(10, 2))
