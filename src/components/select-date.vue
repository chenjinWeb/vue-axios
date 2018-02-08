<style>
    .select_date {
        height: 0.38rem;
        line-height: 0.38rem;
        border-bottom: 1px #e5e5e5 solid;
        background: #fff;
        font-size: 0.14rem;
        color: #999;
    }

    .select_color{
        background:#4fa5ff;
        color:#fff;
    }

    .select_date .pre_date, .select_date .next_date {
        padding: 0 0.125rem;
    }

    .select_date .pre_date i, .select_date .next_date i {
        font-size: 0.14rem;
    }

    .select_date .date_frame {
        -webkit-box-flex: 1;
        flex: 1;
    }

    .sd-box {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 10;
    }

    .sd-con {
        border-radius: .025rem;
        /*transform: translate(0, 50%);*/
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.125);
    }

    .sd-tools {
        background-color: #f7f7f7;
        height: 0.6rem;
        margin-bottom: -0.3rem;
        padding-top: 0.025rem;
    }

    .sd-navigation {
        height: 0.25rem;
        line-height: 0.185rem;
        -webkit-box-pack: justify;
        justify-content: space-between;
        display: flex;
    }

    .sd-btn-link {
        background-color: transparent;
        font-weight: 400;
        color: #0275d8;
        border-radius: 0;
        cursor: pointer;
        outline: 0;
    }

    .sd-btn-link[disabled] {
        opacity: 0.5;
        pointer-events: none;
    }

    .ngb-dp-navigation-chevron.right:before {
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        margin: 0 0.05rem 0 0;
    }

    .ngb-dp-navigation-chevron::before {
        border-style: solid;
        border-width: 0.02rem 0.02rem 0 0;
        content: '';
        display: inline-block;
        height: 0.1rem;
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
        -ms-transform: rotate(-135deg);
        width: 0.1rem;
        margin: 0 0 0 0.05rem;
    }

    .sd-select {
        width: 1.6rem;
        display: flex;
    }

    .sd-select select {
        flex: 1;
        padding: 0.025rem 0.05rem;
        font-size: 0.0875rem;
        line-height: 1.25;
        height: inherit;
        display: inline-block;
        color: #464a4c;
        vertical-align: middle;
        background-size: 8px 10px;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: .025rem;
        -webkit-appearance: none;
        background: #fff;
    }

    .sd-header {
        background-color: #f7f7f7;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0 0.025rem;
    }

    .sd-month {
        background-color: #fff;
        padding: 0 0.025rem;
    }

    .sd-week-day {
        display: flex;
    }

    .sd-week {
        display: flex;
    }

    .sd-day {
        cursor: pointer;
        width: 0.3rem;
        height: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        border-radius: 0.025rem;
        font-size: 0.12rem;
        color: #000;
    }

    .sd-day.select {
        background-color: #3b9bff;
        color: #fff;
    }

    .sd-disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    .sd-outside {
        opacity: 0.5;
    }
</style>
<template>
    <div>
        <div class="select_date flex" :style="{ border: nextbool? '' : 'none' }" ref="select" :class="colorFn(col)">
            <span class="pre_date" :class="{'sd-disabled':isDateEqual}" v-if="prebool">
                <i class="icon" @click="pre()">前一天</i>
            </span>
            <span class="date_frame" tabindex="0" ref="date">
                {{getDateFormat}}
            </span>
            <span class="next_date" :class="{'sd-disabled':nextSelect || isDateEqual}" v-if="nextbool">
                <i class="icon" @click="go()">后一天</i>
            </span>
        </div>

        <div class="sd-box animated fadeOut" ref="sdBox" style="display: none">
            <div class="sd-con" ref="sdCon">
                <div class="sd-tools">
                    <div class="sd-navigation">
                        <button class="sd-btn-link" type="button" @click="navigate('pre')" :disabled="prevDisabled">
                            <span class="ngb-dp-navigation-chevron"></span>
                        </button>
                        <div class="sd-select">
                            <select @change="changeDate()" v-model="modal.month">
                                <option value="" v-for="m in monthSel" :value="m">{{m}}</option>
                            </select>
                            <select @change="changeDate()" v-model="modal.year">
                                <option value="" v-for="y in yearSel" :value="y">{{y}}</option>
                            </select>
                        </div>
                        <button class="sd-btn-link" type="button" @click="navigate('next')" :disabled="nextDisabled">
                            <span class="ngb-dp-navigation-chevron right"></span>
                        </button>
                    </div>
                </div>
                <div class="sd-header">
                    <div class="sd-week-day">
                        <div class="sd-day" v-for="d in ['一','二','三','四','五','六','日']">
                            {{d}}
                        </div>
                    </div>
                </div>
                <div class="sd-month">
                    <div class="sd-week" v-for="w in months">
                        <div class="sd-day" v-for="d in w.days" @touchend="doSelect(d)" :class="{'sd-outside':d.outside,'select':!!d.selected,'sd-disabled':!!d.disabled}">
                            {{d.date.day}}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    export default{
        name: 'y-select-date',
        props: {
            time:{
                type: Object,
            },
            times:{
                type: String,
                default: 'times'
            },
            timee:{
                type: String,
                default: 'timee'
            },
            select: {
                type: Function
            },
            yearType: {
                type: String,
                default: 'end'// start center end
            },
            yearNum: {
                type: Number,
                default: 5
            },
            mode: {
                type: String,
                default: 'compare'// single compare
            },
            futureDate: {
                type: Boolean,
                default: false,
            },
            single:{
                type: Boolean,
                default: false,
            },
            col:{
                type:String,
                default:""
            },
            prebool:{
              type:Boolean,
              default:true
            },
            nextbool:{
              type:Boolean,
              default:true
            }
        },
        data(){
            return {
                date: {},
                tools: false,
                months: [],
                monthSel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                yearSel: [],
                modal: fromJSDate(new Date()),
                maxDate: null,
                minDate: null,
                compareList: [],
            }
        },
        created(){
            this.$set(this.date, 'mode', this.mode);
            let date = new Date();
            switch (this.mode) {
                case 'compare':
                    let s = date;
                    let e = date;
                    let _s = fromJSDate(s);
                    let _e = fromJSDate(e);
                    if(this.time){
                        s = new Date(this.time[this.times]);
                        e = new Date(this.time[this.timee]);
                        _s = fromJSDate(s);
                        _e = fromJSDate(e);
                        if(equalsDate(_s,_e)){
                            _e = _s;
                        }
                    }else{
                        s = new Date();
                        e = new Date();
                        _s = fromJSDate(s);
                        _e = fromJSDate(e);
                        if(equalsDate(_s,_e)){
                            _e = _s;
                        }
                    }
                    this.$set(this.date, 'date', [_s, _e]);
                    this.$set(this.date, 'format', `${Date.format(s, 'yyyy-MM-dd')} / ${Date.format(e, 'yyyy-MM-dd')}`);
                    this.$set(this.date, 'formats', [Date.format(s, 'yyyy-MM-dd'), Date.format(e, 'yyyy-MM-dd')]);
                    break;
                case 'single':
                    this.$set(this.date, 'date', this.getToday());
                    this.$set(this.date, 'format', Date.format(new Date(), 'yyyy-MM-dd'));
                    break;
            }
        },
        mounted(){
            this.initSelect();
            this.initAnimate();
        },
        watch:{
            time(val){
                if(!val) return;
                if(val instanceof Object){
                    let s = new Date(val.times);
                    let e = new Date(val.timee);
                    let start = fromJSDate(s);
                    let end = fromJSDate(e);
                    if(val.times === val.timee){
                        end = start;
                    }
                    this.$set(this.date, 'date', [start, end]);
                    this.$set(this.date, 'format', `${Date.format(s, 'yyyy-MM-dd')} / ${Date.format(e, 'yyyy-MM-dd')}`);
                    this.$set(this.date, 'formats', [Date.format(s, 'yyyy-MM-dd'), Date.format(e, 'yyyy-MM-dd')]);
                }else{
                    let start = new Date(val);
                    this.$set(this.date, 'date', fromJSDate(start));
                    this.$set(this.date, 'format', Date.format(start, 'yyyy-MM-dd'));
                }
            },
        },
        computed: {
            prevDisabled(){
                let prevDate = this.getPrev(this.modal, 'm');
                return beforeDate(prevDate, this.minDate);
            },
            nextDisabled(){
                let nextDate = this.getNext(this.modal, 'm');
                return afterDate(nextDate, this.maxDate);
            },
            nextSelect(){
                if(this.futureDate){
                    let date;
                    let nextDate;
                    switch (this.mode) {
                        case 'compare':
                            date = this.date.date[1];
                            nextDate = this.getNext(date);
                            break;
                        case 'single':
                            date = this.date.date;
                            nextDate = this.getNext(date);
                            break;
                    }
                    return afterDate(nextDate, this.getToday());
                }
                return false;
            },
            getDateFormat(){
                switch (this.mode) {
                    case 'compare':
                        let s = this.date.formats[0];
                        let e = this.date.formats[1];
                        if(s === e){
                            return this.date.formats[0]
                        }else{
                            return this.date.format
                        }
                    case 'single':
                        return this.date.format;
                }
            },
            isDateEqual(){
                if(this.mode === 'compare'){
                    let s = this.date.formats[0];
                    let e = this.date.formats[1];
                    if(s !== e){
                        return true;
                    }
                }
                return false;
            }
        },
        methods: {
            colorFn(col){
                if(col=="blue"){
                    return "select_color"
                }
            },
            doSelect(d){
                this.$set(d, 'selected', true);
                switch (this.mode) {
                    case 'compare':
                        this.compareSelect(d);
                        break;
                    case 'single':
                        this.singleSelect(d);
                        break;
                }
            },
            compareSelect(date){
                if(this.compareList[0] && equalsDate(this.compareList[0].date,date.date) && this.single){
                   return false;
                }
                this.compareList.push(date);
                if (this.compareList.length >= 2) {
                    Reflect.deleteProperty(this.compareList[0], 'selected');
                    Reflect.deleteProperty(this.compareList[1], 'selected');
                    this.compareList.sort((a, b) => {
                        return afterDate(a.date, b.date);
                    });
                    this.$set(this.date, 'date', Object.assign([], this.compareList.map((a) => a.date)));
                    this.$set(this.date, 'format', Date.format(toJSDate(this.compareList[0].date), 'yyyy-MM-dd') + ' / ' + Date.format(toJSDate(this.compareList[1].date), 'yyyy-MM-dd'));
                    this.$set(this.date, 'formats', [Date.format(toJSDate(this.compareList[0].date), 'yyyy-MM-dd'), Date.format(toJSDate(this.compareList[1].date), 'yyyy-MM-dd')]);
                    this.$emit('select', this.date);
                    this.compareList.length = 0;
                    this.close();
                }
            },
            singleSelect(date){
                this.compareList.push(date);
                if (this.compareList.length >= 1) {
                    Reflect.deleteProperty(this.compareList[0], 'selected');
                    this.$set(this.date, 'date', Object.assign({}, this.compareList[0].date));
                    this.$set(this.date, 'format', Date.format(toJSDate(this.compareList[0].date), 'yyyy-MM-dd'));
                    this.$emit('select', this.date);
                    this.compareList.length = 0;
                    this.close();
                }
            },
            changeDate(){
                this.intiData();
            },
            navigate(type){
                switch (type) {
                    case 'pre':
                        this.modal = this.getPrev(this.modal, 'm');
                        break;
                    case 'next':
                        this.modal = this.getNext(this.modal, 'm');
                        break;
                }
                this.intiData();
            },
            intiData(date = this.modal){
                this.months.length = 0;
                const currentMonth = date.month;
                let fistDate = this.getFirstViewDate(date);
                for (let i = 0; i < 6; i++) {
                    let days = [];
                    for (let i = 0; i < 7; i++) {
                        let newDate = {year: fistDate.year, month: fistDate.month, day: fistDate.day};
                        let data = {date: newDate};
                        if (currentMonth !== newDate.month) {
                            data.outside = true;
                        }
                        if (this.futureDate && afterDate(newDate, this.getToday())) {
                            data.disabled = true;
                        }
                        if (this.mode === 'compare' && this.compareList.length > 0) {
                            this.compareList.forEach((d) => {
                                if (equalsDate(d.date, newDate)) {
                                    this.$set(data, 'selected', true);
                                }
                            });
                        }
                        days.push(data);
                        fistDate = this.getNext(fistDate);
                    }
                    this.months.push({days: days})
                }
            },
            initSelect(){
                switch (this.yearType) {
                    case 'start':

                        break;
                    case 'center':

                        break;
                    case 'end':
                        let fullYear = new Date().getFullYear();
                        this.maxDate = {year: fullYear, month: 12};
                        for (let i = 0; this.yearNum > i; i++) {
                            this.yearSel.push(fullYear - i);
                        }
                        this.minDate = {year: this.yearSel[this.yearNum - 1], month: 1};
                        break;
                }
            },
            destroyData(){

            },
            initAnimate(){
                let selectRef = this.$refs.select;
                let dateRef = this.$refs.date;
                let sdBoxRef = this.$refs.sdBox;
                let sdConRef = this.$refs.sdCon;
                /*有问题 需要异步vue有问题*/
                setTimeout(() => {
                    sdConRef.style.transform = `translate(0, ${selectRef.offsetTop + selectRef.offsetHeight}px)`;
                });
                dateRef.addEventListener('touchend', (event) => {
                    this.open();
                });
                dateRef.addEventListener('blur', (event) => {

                });
                sdBoxRef.addEventListener('touchend', (event) => {
                    event.target.classList.contains('sd-box') && this.close();
                })
            },
            open(){
                this.destroyData();
                this.modal = fromJSDate(new Date());
                this.intiData();
                let sdBoxRef = this.$refs.sdBox;
                sdBoxRef.classList.remove('fadeOut');
                sdBoxRef.classList.add('fadeIn');
                sdBoxRef.style.display = 'block';
//                this.tools = true;
            },
            close(){
                let sdBoxRef = this.$refs.sdBox;
                sdBoxRef.classList.remove('fadeIn');
                sdBoxRef.classList.add('fadeOut');
                setTimeout(() => {
                    sdBoxRef.style.display = 'none';
//                    this.tools = false;
                    this.destroyData();
                }, 180);
            },
            pre(){
                switch (this.mode) {
                    case 'compare':
                        Object.assign(this.date.date[0], this.getPrev(this.date.date[0]));
                        this.$set(this.date, 'format', Date.format(toJSDate(this.date.date[0]), 'yyyy-MM-dd') + ' / ' + Date.format(toJSDate(this.date.date[1]), 'yyyy-MM-dd'));
                        this.$set(this.date, 'formats', [Date.format(toJSDate(this.date.date[0]), 'yyyy-MM-dd'), Date.format(toJSDate(this.date.date[1]), 'yyyy-MM-dd')]);
                        break;
                    case 'single':
                        Object.assign(this.date.date, this.getPrev(this.date.date));
                        this.$set(this.date, 'format', Date.format(toJSDate(this.date.date), 'yyyy-MM-dd'));
                        break;
                }
                this.$emit('select', this.date);
            },
            go(){
                switch (this.mode) {
                    case 'compare':
                        Object.assign(this.date.date[1], this.getNext(this.date.date[1]));
                        this.$set(this.date, 'format', Date.format(toJSDate(this.date.date[0]), 'yyyy-MM-dd') + ' / ' + Date.format(toJSDate(this.date.date[1]), 'yyyy-MM-dd'));
                        this.$set(this.date, 'formats', [Date.format(toJSDate(this.date.date[0]), 'yyyy-MM-dd'), Date.format(toJSDate(this.date.date[1]), 'yyyy-MM-dd')]);
                        break;
                    case 'single':
                        Object.assign(this.date.date, this.getNext(this.date.date));
                        this.$set(this.date, 'format', Date.format(toJSDate(this.date.date), 'yyyy-MM-dd'));
                        break;
                }
                this.$emit('select', this.date);
            },
            getWeekday(date){
                let jsDate = toJSDate(date);
                let day = jsDate.getDay();
                return day === 0 ? 7 : day;
            },
            getToday(){
                return fromJSDate(new Date());
            },
            getNext(date, period = 'd', number = 1){
                let jsDate = toJSDate(date);
                switch (period) {
                    case 'y':
                        return {year: date.year, month: 1, day: 1};
                    case 'm':
                        jsDate = new Date(date.year, date.month + number - 1, 1);
                        break;
                    case 'd':
                        jsDate.setDate(jsDate.getDate() + number);
                        break;
                    default:
                        return date;
                }
                return fromJSDate(jsDate);
            },
            getPrev(date, period = 'd', number = 1) {
                return this.getNext(date, period, -number);
            },
            getFirstViewDate(date, firstDayOfWeek = 1){
                const currentMonth = date.month;
                let today = Object.assign({}, date);
                let yesterday = this.getPrev(date);
                let bo1 = () => today.month !== yesterday.month && firstDayOfWeek === this.getWeekday(today);
                let bo2 = () => today.month !== currentMonth && firstDayOfWeek === this.getWeekday(today);
                let i = 0;
                while (!bo1() && !bo2()) {
                    today = {year: yesterday.year, month: yesterday.month, day: yesterday.day};
                    yesterday = this.getPrev(yesterday);
                    i++;
                }
                return today;
            }
        }
    }

    function toJSDate(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        if (!isNaN(jsDate.getTime())) {
            jsDate.setFullYear(date.year);
        }
        return jsDate;
    }

    function fromJSDate(jsDate) {
        return {year: jsDate.getFullYear(), month: jsDate.getMonth() + 1, day: jsDate.getDate()};
    }

    function equalsDate(assign, other) {
        return other && assign.year === other.year && assign.month === other.month && assign.day === other.day;
    }

    function afterDate(assign, other) {
        if (!other || !assign) {
            return false;
        }
        if (assign.year === other.year) {
            if (assign.month === other.month) {
                return assign.day === other.day ? false : assign.day > other.day;
            } else {
                return assign.month > other.month;
            }
        } else {
            return assign.year > other.year;
        }
    }

    function beforeDate(assign, other) {
        if (!other || !assign) {
            return false;
        }
        if (assign.year === other.year) {
            if (assign.month === other.month) {
                return assign.day === other.day ? false : assign.day < other.day;
            } else {
                return assign.month < other.month;
            }
        } else {
            return assign.year < other.year;
        }
    }

</script>
