function boot_sequence () {
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
    for (let index = 0; index < 12; index++) {
        strip.rotate(1)
        strip.show()
        basic.pause(24)
    }
    strip.clear()
    strip.show()
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(1)
})
// ...så å peke alle fingrene nedover.
input.onGesture(Gesture.LogoUp, function () {
    if (FIRE_IN_THE_HOLE == false) {
        if (safety == 2) {
            armed = true
            basic.showLeds(`
                . # . # .
                . # # # .
                # # # # #
                # . # . #
                . # # # .
                `)
            led.setBrightness(255)
        } else {
            armed = false
            safety = 0
            led.setBrightness(10)
        }
    } else {
    	
    }
})
// Første steg av sikkerhetsprosedyren. Med kanon I venstre hand, blir dette å vende tommelen opp 2 ganger.
input.onGesture(Gesture.TiltLeft, function () {
    if (FIRE_IN_THE_HOLE == false) {
        armed = false
        safety += 1
        basic.pause(200)
    } else {
    	
    }
})
function misfire () {
    basic.showIcon(IconNames.No)
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . # . # .
        . . . . .
        `)
    led.setBrightness(10)
}
// "Varmer opp" kanonen sakte, så avfyres tre kraftige strobelys.
function PEWPEW () {
    if (FIRE_IN_THE_HOLE == false && armed == true) {
        FIRE_IN_THE_HOLE = true
        basic.showLeds(`
            . . # . .
            . . . . .
            . . # . .
            . . # . .
            . . # . .
            `)
        power = 0
        strip.clear()
        strip.show()
        power = 30
        strip.showColor(neopixel.rgb(power, power, power))
        strip.show()
        basic.pause(2000)
        for (let index = 0; index < 8; index++) {
            power += 10
            strip.showColor(neopixel.rgb(power, power, power))
            strip.show()
            basic.pause(250)
        }
        for (let index = 0; index < 14; index++) {
            power += 10
            strip.showColor(neopixel.rgb(power, power, power))
            strip.show()
            basic.pause(21)
        }
        strip.setBrightness(255)
        basic.pause(750)
        for (let index = 0; index < 8; index++) {
            power = 0
            strip.showColor(neopixel.rgb(power, power, power))
            strip.show()
            basic.pause(randint(24, 42))
            power = randint(150, 255)
            strip.showColor(neopixel.rgb(power, power, power))
            strip.show()
            basic.pause(randint(24, 42))
        }
        strip.clear()
        strip.show()
        strip.setBrightness(10)
        basic.pause(2000)
        armed = false
        FIRE_IN_THE_HOLE = false
        basic.showLeds(`
            . . . . .
            . . # . .
            . . . . .
            . # . # .
            . . . . .
            `)
    } else {
    	
    }
}
// MANUELL OVERSTYRING AV SIKKERHETSPROTOKOLLER
input.onButtonPressed(Button.AB, function () {
    if (FIRE_IN_THE_HOLE == false) {
        armed = true
        PEWPEW()
        basic.pause(200)
    } else {
    	
    }
})
// For debugging.
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
})
input.onGesture(Gesture.Shake, function () {
    boot_sequence()
})
// Første steg av sikkerhetsprosedyren. Med kanon I venstre hand, blir dette å vende tommelen opp 2 ganger.
input.onGesture(Gesture.TiltRight, function () {
    if (FIRE_IN_THE_HOLE == false) {
        safety = 0
        armed = false
        led.setBrightness(10)
        basic.pause(200)
    } else {
    	
    }
})
// Bevegelsesaktivert avfyring. Med microBit festet på håndbaken, fyres kanonen av når hånden løftes.
input.onGesture(Gesture.LogoDown, function () {
    if (FIRE_IN_THE_HOLE == false) {
        if (armed == true) {
            PEWPEW()
            led.setBrightness(10)
        } else {
            misfire()
        }
    } else {
    	
    }
})
/**
 * Dette er programmet til fjernkontrollen som ble brukt sammen med "Neopixel-jakke-V6" på Halloween 2019.
 * 
 * micro:biten var montert på en hanske med en veldig kraftig LED-lys-ring (kjøpt på Kjell&Co) i håndflaten. 
 * 
 * A og B-knappene skifter fargemodus på jakken, og ved å rotere hansken i et bestemt mønster fyres av en VELDIG kraftig blitz. (Iron Man pewpew)
 */
// Setup: IndikatorLED for å vise at Micro:Biten er på. Stiller inn neopixel til 12-LED ring fra KjellCo.
// Desarmerer lyskanonen.
//     
let power = 0
let safety = 0
let FIRE_IN_THE_HOLE = false
let armed = false
let strip: neopixel.Strip = null
radio.setGroup(8)
led.setBrightness(10)
basic.showLeds(`
    . . . . .
    . . # . .
    . . . . .
    . # . # .
    . . . . .
    `)
strip = neopixel.create(DigitalPin.P1, 12, NeoPixelMode.RGB)
strip.clear()
strip.setBrightness(10)
strip.show()
boot_sequence()
armed = false
FIRE_IN_THE_HOLE = false
safety = 0
