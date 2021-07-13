import Vue from 'vue'
import Router from 'vue-router'
import demo1 from '@/views/demo1'
import message from "@/views/message";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'demo1',
      component: demo1
    },
    {
      path: '/message',
      name: 'message',
      component: message
    }
  ]
})
