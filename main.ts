// 通常着陸
input.onButtonPressed(Button.A, function () {
    serial.writeLine("land")
    basic.showArrow(ArrowNames.South)
    basic.pause(1000)
})
input.onButtonPressed(Button.AB, function () {
    // 無線接続 2回送信すると確実
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
// RCモード対応のために受信前の表示を削除してレスポンス向上
radio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
    basic.showIcon(IconNames.Target)
    basic.pause(200)
    basic.clearScreen()
})
// Bボタンをダブルクリック入力でエマージェンシー停止
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 4; index++) {
        basic.pause(100)
        if (input.buttonIsPressed(Button.B)) {
            serial.writeLine("emergency")
            basic.showIcon(IconNames.No)
            basic.pause(1000)
            break;
        }
    }
})
let pass = ""
let ssid = ""
// 無線グループはこちらで設定
let radio_group = 37
// 速度は57600
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate57600
)
radio.setGroup(radio_group)
// デフォルトは7
radio.setFrequencyBand(radio_group % 84)
// 受信機なので0とする
radio.setTransmitPower(0)
// TelloのSSIDを入れる
ssid = "TELLO-" + "9BF7EB"
pass = ""
basic.showString(ssid.substr(10, 2))
// 自動接続
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
