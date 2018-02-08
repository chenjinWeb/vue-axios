<style>
    .sheet-box {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .sheet-box .sheet-o {
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 11;
    }

    .sheet-box .sheet {
        padding: 0 0.3rem;
        margin: 0.1rem 0 0.1rem 0.1rem;
        max-height: 3.5rem;
        overflow: auto;
        text-align: left;
    }
</style>
<template>
    <div class="sheet-box animated" v-show="disabled" ref="sheetBox">
        <div class="sheet-o animated" ref="sheet">
            <ol class="sheet animated">
                <li v-for="d in data" @click="$emit('select',d),$refs.sheetBox.click()">{{d.name}}</li>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'y-sheet',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: []
            },
            select: {
                type: Function,
            }
        },
        data(){
            return {
                disabled: false,
                state: 0//0初始状态 1打开 2正在关闭
            }
        },
        mounted(){
            this.initEvent();
        },
        watch: {
            disabled(val){
                let sheetRef = this.$refs.sheet;
                let sheetBoxRef = this.$refs.sheetBox;
                this.$emit('input', val);
                if (val) {
                    sheetRef.classList.remove('slideOutDown');
                    sheetRef.classList.add('slideInUp');
                    sheetBoxRef.classList.remove('fadeOut');
                    sheetBoxRef.classList.add('fadeIn');
                    setTimeout(() => {
                        this.state = 1;
                    }, 180)
                }
            },
            value(val) {
                if (this.data && this.data.length > 0) {
                    this.disabled = val;
                } else {
                    this.$emit('input', false);
                }
            }
        },
        methods: {
            initEvent(){
                let sheetBoxRef = this.$refs.sheetBox;
                sheetBoxRef.addEventListener('click', (e) => {
                    let el = e.target;
                    if (el.classList.contains('sheet-box') && this.state === 1) {
                        this.state = 2;
                        let sheetRef = this.$refs.sheet;
                        sheetRef.classList.remove('slideInUp');
                        sheetRef.classList.add('slideOutDown');
                        sheetBoxRef.classList.remove('fadeIn');
                        sheetBoxRef.classList.add('fadeOut');
                        setTimeout(() => {
                            this.disabled = !this.disabled;
                            this.state = 0;
                        }, 180)
                    }
                })
            }
        }
    }
</script>
