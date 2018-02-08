  <template>
    <div class="content-modal">
        <div class="content">
            <div class="scroll-content">
                <div class="login_body">
                    <div class="form">
                        <div class="ifrom clear">
                            <input type="text" name="name" placeholder="请输入登录名" class="name" v-model="user.username">
                        </div>
                        <div class="ifrom clear">
                            <input type="password" name="password" placeholder="请输入密码" v-model="user.password">
                        </div>
                        <div class="sublogin"><a href="javascript:;" class="btn">登录</a></div>
                        <div class="sublogin"><a href="javascript:;" class="btn" style="background-color: #63c73b">微信登录</a></div>
                    </div>
                    <!--<router-link :to="{name:'about'}" class="drop-down">
                        下拉情况介绍<br><i class="icon">&#xe60c;</i>
                    </router-link>-->
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <router-view></router-view>
        </transition>
    </div>
</template>


<script>
    import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import {autoCookie,removeCookie} from "../../utils"
    export default {
        data() {
            return {
              user:{
                username:"mcj",
                password:"mcj224221"
              }
            }
        },
        mounted: function () {

        },
        methods: {
            ...mapActions([

            ]),
            ...mapMutations([

            ]),
            login(){

            },
            getproductlimit(){

            },
            weiXinLogin(){

            },
            goWxBind(id){

            }
        }
    }
</script>
