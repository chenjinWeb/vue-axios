<template>

    <div class="point_title">
        <p class="top"><span>当前状态</span></p>
        <div class="state">
            <div class="statu flex">
                <dl v-for="(l,$index) in locationCheckStates" :class="l.iconState==2 && $index!=3? 'on' : ''">
                    <dt>
                        <!--1,高亮状态,2,中间亮度,3,变灰-->
                        <span class="line" v-if="$index==0" :class="l.iconState==3? 'hui' : 'bule'">点位</span>
                        <span class="line" v-if="$index==1" :class="l.iconState==3? 'hui' : 'bule'">审核</span>
                        <span class="line" v-if="$index==2" :class="l.iconState==3? 'hui' : 'bule'">实施</span>
                        <span class="line" v-if="$index==3" :class="l.iconState==3? 'hui' : 'bule'">补货</span>
                    </dt>
                    <dd>
                        <a :href="'tel:'+l.phone" class="phone_a"></a>
                        <p>{{l.userName}}</p>
                    </dd>
                    <div class="line" :class="l.iconState==3? 'hui' : 'bule'" v-if="$index!=3"></div>
                </dl>
            </div>
        </div>
        <ul class="minute" v-if="data.length!=0">
            <li class="flex minute_list" v-if="data.length>0" v-for="(d,$index) in data">
                <p class="time">
                    <span>{{d.time? d.time.split(" ")[0] : today}}</span>
                    <span>{{d.userName}}</span>
                    <span>{{d.message}}</span>
                </p>
                <p class="reason">
                    <span class="bulecolr" @click="checkreason(d.id)" v-if="d.state==3 && d.showButton==4">原因</span>
                    <span v-if="d.state!=1 && d.showButton!=2">{{stateStr(d.state)}}</span>
                    <span v-if="d.showButton==1 && d.state==1 && stateextrasInfo.deal_able" class="span_btn" @click="handlestate(d.id)">处理</span>
                    <span v-if="d.state==2 && d.showButton==2 && stateextrasInfo.apply_implement_able" class="span_btn" @click="zhipai(d.id)">指派实施</span>
                  <span v-if="d.state==6 && d.showButton==3 && stateextrasInfo.apply_replenishment_able" class="span_btn" @click="zhiding(d.id)">指定补货</span>
                </p>
            </li>
            <!--<li style="color: #ccc;" >暂无数据</li>-->
        </ul>
        <div style="height: 0.6rem; padding-top: 0.1rem;" v-if="extrasInfo.apply_vm_able && (extrasInfo.flow_state==0 || extrasInfo.flow_state==3) && pointData.length>0">
          <div class="machine_sub" @click="applyVm()">申请机器</div>
        </div>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
        <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
          <div style="font-size: 0.16rem;">实施人员</div>
          <ul style="margin-top: 0.2rem; max-height: 2.0rem; overflow-y: scroll;">
            <li v-for="(a,$index) in arr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;" @click="selectuser(a.id)">{{a.userName}}</li>
          </ul>
        </div>
      </mt-popup>

      <mt-popup
        v-model="userVisible"
        popup-transition="popup-fade" style="width: 80%; border-radius: 0.05rem;">
        <div style=" height: auto; background: #fff; padding: 0.1rem; border-radius: 0.05rem;">
          <div style="font-size: 0.16rem;">补货人员</div>
          <ul style="margin-top: 0.2rem; max-height: 2.0rem; overflow-y: scroll;">
            <li v-for="(u,$index) in userarr" style=" line-height: 0.4rem; text-align: left; text-indent: 0.1rem;" @click="selectreplent(u.id)">{{u.userName}}</li>
          </ul>
        </div>
      </mt-popup>

  </div>

</template>

<script>
    import Vue from "vue"

    import {mapActions} from "vuex"

    import {MessageBox,Popup} from "mint-ui"

    Vue.component(Popup.name, Popup);

    export default {
        name: "y-state",
        data() {
            return {
              today:Date.format(new Date,"yyyy-MM-dd"),
              popupVisible:false,
              arr:[],
              location_state_id:"",
              userVisible:false,
              userarr:[]
            }
        },
        props:{
          pointData:{
            type:Array,
            default:[]
          },
          locationCheckStates:{
            type:Array,
            default:[]
          },
          data:{
            type:Array,
            default:[]
          },
          areaId:{
            type:String,
            default:""
          },
          extrasInfo:{
            type:Object,
            default:{}
          },
          stateextrasInfo:{
            type:Object,
            default:{}
          }
        },
        computed: {

        },
        methods: {
          ...mapActions([
            "applyvm_",
            "checkreason_",
            "handlestate_",
            "getassign_",
            "setassign_",
            "replenishuser_",
            "getreplent_"
          ]),
          applyVm(){
            let data=[];
            for(var i=0;i<this.pointData.length;i++){
              data.push({
                id:this.pointData[i].id,
                vmCount:this.pointData[i].vmCount,
                areaId:this.pointData[i].areaId,
              })
            }
            this.applyvm_(data).then((res)=>{
              if(res.success==200){
                this.$router.go(0)
              }
            })
          },
          //查看原因
          checkreason(id){
            this.checkreason_({location_state_id:id}).then((res)=>{
              if(res.success==200){
                MessageBox({
                  title: '拒绝原因',
                  message: res.data? res.data : "",
                  showCancelButton: false
                });
              }
            })
          },
          //状态1,待审核;2,审核通过,3,审核失败,4,待实施,5,实施中,6,实施完成,7,待补货,8,,9,补货完成
          stateStr(state){
            switch (state.toString()){
              case "1":
                return "待审核";
                break;
              case "2":
                return "审核通过";
                break;
              case "3":
                return "审核失败";
                break;
              case "4":
                return "待实施";
                break;
              case "5":
                return "实施中";
                break;
              case "6":
                return "实施完成";
                break;
              case "7":
                return "待补货";
                break;
              case "8":
                return "";
                break;
              case "9":
                return "";
                break;
            }
          },
          //处理
          handlestate(id){
            this.$router.push({name:"handlestate",query:{state:id}})
          },
          //指定补货
          zhiding(id){
            this.location_state_id=id;
            this.getreplent_().then((res)=>{
              if(res.success==200){
                this.userVisible=true;
                this.userarr = res.data
              }
            })
          },
          selectreplent(id){
            const data = {
              location_state_id:this.location_state_id,
              replenishment_user_id:id
            }
            this.replenishuser_(data).then((res)=>{
              this.userVisible=false;
              if(res.success==200){
                MessageBox.alert("指定补货成功").then(action=>{
                  this.$router.go(0);
                })
              }else {
                MessageBox.alert(res.message)
              }
            })
          },
          //指派实施
          zhipai(id){
            this.location_state_id=id;
            this.getassign_().then((res)=>{
              if(res.success==200){
                this.popupVisible=true;
                this.arr = res.data
              }
            })
          },
          selectuser(id){
            const data = {
              location_state_id:this.location_state_id,
              build_user_id:id
            }
            this.setassign_(data).then((res)=>{
              this.popupVisible=false;
              if(res.success==200){
                MessageBox.alert("指派成功");
                this.$router.go(0);
              }else {
                MessageBox.alert(res.message)
              }
            })
          }
        },
        mounted() {
          //console.info(this.areaId)

        }

    }

</script>

<style scoped>


</style>
