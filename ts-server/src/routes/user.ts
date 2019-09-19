import * as Koa from 'koa' 
import { get,post, middlewares } from '../utils/route-decors'


const users = [{name:'tome',age:22}]

@middlewares([
    async function guard(ctx:Koa.Context,next: () => Promise<any>){
        if(ctx.header.token){
            await next()
        }else{
            throw '请登录'
        }
    }
])

export default class User {

    @get('/users')
    public list(ctx: Koa.Context){
        ctx.body = {ok:1,data:users}
    }

    @post('/users',{
        middlewares:[
            async function validatin(ctx:Koa.Context,next :() => Promise<any>){
                //用户名必需
                const name = ctx.request.body.name
                if(!name){
                    console.log('请输入用户名')
                    throw '请输入用户名'
                }
                else{
                    await next()
                }
            }
        ]
    })
    public add(ctx: Koa.Context){
        users.push(ctx.request.body)
        ctx.body = {ok:1}

    }
}