import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import { post, get, get_post,setItem, getItem, remItem } from './com'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // getInfo: getItem('getInfo') ? getItem('getInfo') : null,
        // menuList: getItem('menuList') ? getItem('menuList') : null,
        // bgColor: getItem('bgColor') ? getItem('bgColor') : '#515a6e'
    },
    mutations: {
        SET_GETINFO: (state, getInfo) => {
            state.getInfo = getInfo;
        },
        SET_BGCOLOR: (state, bgColor) => {
            state.bgColor = bgColor;
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList;
        }
    },
    getters: {
        getInfo: state => state.getInfo,
        menuList: state => state.menuList,
        bgColor: state => state.bgColor
    },
    actions: {
        // 账户登录
        accessToken({ commit }, paras) {
            return new Promise((resolve, reject) => {
                get('app/code/accessToken', paras).then(res => {
                    if (res && res.message == "success") {
                        setItem('access_token', res.data.access_token);
                        setItem('open_id', res.data.open_id);
                        setItem('refresh_token', res.data.refresh_token);
                        setItem('scope', res.data.scope);                
                        // commit('SET_GETINFO', res.resObj);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },        

        uploadVideo({ commit }, paras) {
            return new Promise((resolve, reject) => {
                post('app/video/uploadVideo', paras).then(res => {
                    if (res && res.data.video) {
                        setItem('video.video_id',res.data.video.video_id);                
                        setItem('video.width', res.data.video.width);            
                        setItem('video.height', res.data.video.height);            
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        createVideo({ commit },paras) {
            return new Promise((resolve, reject) => {
                let getParas=paras.getParas;
                let postParas=paras.postParas;
                get_post('app/video/createVideo', getParas,postParas).then(res => {
                    if (res &&res.data.video) {
                        setItem('video_uped.item_id', res.data.item_id);   
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        


        videoList({ commit }, paras) {
            return new Promise((resolve, reject) => {
                get('app/video/videoList', paras).then(res => {
                    // if (res &&res.data.error_code!=0) {                  
                      
                    // }
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        
        enterpriseVideoList({ commit }, paras) {
            return new Promise((resolve, reject) => {
                get('app/video/getEnterpriseVideos', paras).then(res => {
                    // if (res &&res.data.error_code!=0) {                  
                      
                    // }
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },



        userInfo({ commit }, paras) {
            return new Promise((resolve, reject) => {
                get('app/user/info', paras).then(res => {
                    if (res && res.message == "success") {
                        setItem('access_token', res.data.access_token);                
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        publish({ commit }, paras) {
            return new Promise((resolve, reject) => {
                post('app/video/publish', paras).then(res => {                   
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 账户登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                post('user/login', userInfo).then(res => {
                    if (res && res.resCode == 1) {
                        setItem('getInfo', res.resObj);
                        commit('SET_GETINFO', res.resObj);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 拉取菜单列表
        MenuList({ commit }, id) {
            return new Promise((resolve, reject) => {
                post('user/listMenu', id).then(res => {
                    if (res && res.resCode == 1) {
                        setItem('menuList', res.resObj);
                        commit('SET_MENULIST', res.resObj);
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 清除所有的本地缓存
        clearAll({ commit }) {
            return new Promise((resolve) => {
                remItem();
                //清除储存在state中的值
                commit('SET_GETINFO', null)
                commit("SET_MENULIST", null)
                router.push('/login')
                resolve()
            })
        }
    }
})

export default store
