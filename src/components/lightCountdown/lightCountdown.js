/**
 * LightCountdown javascript plugin
 * @version 1.4
 */

import "./lightCountdown.scss"

export default class LightCountdown {
    constructor(config = {}) {
        this.config = {
            selector: '.lightcountdown',
            dateEnd: null,
            seconds: true,
            minutes: true,
            hours: true,
            days: true,
            separator: ':',
            finish: null,
            interval: 1000,
            animation: false,
            animationDuration: '500ms',
            language: {
                seconds: "Секунд",
                minutes: "Минут",
                hours: "Часов",
                days: "Дней"
            }
        }
        this.config = {...this.config, ...config}

        if (this.config.selector instanceof Node) {
            this.containers = [this.config.selector]
        } else if (this.config.selector instanceof NodeList) {
            this.containers = this.config.selector
        } else if (typeof this.config.selector === "string") {
            this.containers = document.querySelectorAll(this.config.selector)
        } else {
            throw new Error("LightCountdown: Invalid Selector")
        }

        if (!(this.config.dateEnd instanceof Date)) {
            this.config.dateEnd = Date.parse(this.config.dateEnd) ? new Date(this.config.dateEnd) : this.getDefaultDate()
        }

        if (this.containers.length < 1) {
            return null
        }
        this.timer = 0

        Array.prototype.forEach.call(this.containers, (e) => this.createContainer(e))
        return this
    }

    play() {
        this.timer = setInterval(() => this.tick(), this.config.interval)
    }

    stop() {
        clearInterval(this.timer)
        if (typeof this.config.finish === "function") {
            this.config.finish(this.containers)
        }
    }

    tick() {
        let range = this.getRange()
        if (range.v < 0) {
            range = {
                s: '00',
                m: '00',
                h: '00',
                d: '00',
                v: 0
            };
            this.stop()
        }
        //console.log(value)
        Array.prototype.forEach.call(this.containers, (container) => {

            if (this.config.days) {
                Array.prototype.forEach.call(container.querySelectorAll('.lightcountdown__days .lightcountdown__digit'), (e, i) => {
                    if (e.textContent !== range.d.toString()[i]) {
                        e.textContent = range.d.toString()[i]
                        if (this.config.animation) {
                            e.classList.add(...this.config.animation.split(' '))
                        }
                    }
                })
            }

            if (this.config.hours) {
                Array.prototype.forEach.call(container.querySelectorAll('.lightcountdown__hours .lightcountdown__digit'), (e, i) => {
                    if (e.textContent !== range.h.toString()[i]) {
                        e.textContent = range.h.toString()[i]
                        if (this.config.animation) {
                            e.classList.add(...this.config.animation.split(' '))
                        }
                    }
                })
            }

            if (this.config.minutes) {
                Array.prototype.forEach.call(container.querySelectorAll('.lightcountdown__minutes .lightcountdown__digit'), (e, i) => {
                    if (e.textContent !== range.m.toString()[i]) {
                        e.textContent = range.m.toString()[i]
                        if (this.config.animation) {
                            e.classList.add(...this.config.animation.split(' '))
                        }
                    }
                })
            }

            if (this.config.seconds) {
                Array.prototype.forEach.call(container.querySelectorAll('.lightcountdown__seconds .lightcountdown__digit'), (e, i) => {
                    if (e.textContent !== range.s.toString()[i]) {
                        e.textContent = range.s.toString()[i]
                        if (this.config.animation) {
                            e.classList.add(...this.config.animation.split(' '))
                        }
                    }
                })
            }
        })
    }

    getRange() {
        let now = new Date()
        let value = this.config.dateEnd - now
        let s = Math.floor(value / 1000 % 60)
        let m = Math.floor(value / 1000 / 60 % 60)
        let h = Math.floor(value / 1000 / 60 / 60 % 24)
        let d = Math.floor(value / 1000 / 60 / 60 / 24 % 365)

        if (s < 10) s = "0".concat(s)
        if (m < 10) m = "0".concat(m)
        if (h < 10) h = "0".concat(h)
        if (d < 10) d = "0".concat(d)

        return {
            s: s,
            m: m,
            h: h,
            d: d,
            v: value
        }
    }

    createContainer(container) {
        let range = this.getRange()
        let template = []
        let separator = `<div class="lightcountdown__separator">${this.config.separator}</div>`

        container.classList.add('lightcountdown__container')

        if (this.config.days) {
            template.push(`<div class="lightcountdown__item lightcountdown__days">
                <div class="lightcountdown__digits">
                    <div class="lightcountdown__digit">${range.d.toString()[0]}</div>
                    <div class="lightcountdown__digit">${range.d.toString()[1]}</div>
                </div>
                <div class="lightcountdown__text">${this.config.language.days}</div>
            </div>`)
        }

        if (this.config.hours) {
            template.push(`<div class="lightcountdown__item lightcountdown__hours">
                <div class="lightcountdown__digits">
                    <div class="lightcountdown__digit">${range.h.toString()[0]}</div>
                    <div class="lightcountdown__digit">${range.h.toString()[1]}</div>
                </div>
                <div class="lightcountdown__text">${this.config.language.hours}</div>
            </div>`)
        }

        if (this.config.minutes) {
            template.push(`<div class="lightcountdown__item lightcountdown__minutes">
                <div class="lightcountdown__digits">
                    <div class="lightcountdown__digit">${range.m.toString()[0]}</div>
                    <div class="lightcountdown__digit">${range.m.toString()[1]}</div>
                </div>
                <div class="lightcountdown__text">${this.config.language.minutes}</div>
            </div>`)
        }

        if (this.config.seconds) {
            template.push(`<div class="lightcountdown__item lightcountdown__seconds">
                <div class="lightcountdown__digits">
                    <div class="lightcountdown__digit">${range.s.toString()[0]}</div>
                    <div class="lightcountdown__digit">${range.s.toString()[1]}</div>
                </div>
                <div class="lightcountdown__text">${this.config.language.seconds}</div>
            </div>`)
        }

        container.innerHTML = template.join(separator)

        if (this.config.animation) {
            Array.prototype.forEach.call(container.querySelectorAll('.lightcountdown__digit'), (e) => {
                e.style.animationDuration = this.config.animationDuration
                e.addEventListener('animationend', () => {
                    e.classList.remove(...this.config.animation.split(' '))
                })
            })
        }
    }

    getDefaultDate() {
        let dateEnd = new Date()
        dateEnd.setDate(dateEnd.getDay() ? dateEnd.getDate() - dateEnd.getDay() + 8 : dateEnd.getDate() + 1)
        dateEnd.setHours(0, 0, 0)
        return dateEnd
    }
}
