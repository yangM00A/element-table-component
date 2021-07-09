import Vue from 'vue'
import Router from 'vue-router'
import table001 from '@/views/table001'
import message from "@/views/message";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'table001',
      component: table001
    },
    {
      path: '/message',
      name: 'message',
      component: message
    }
  ]
})
