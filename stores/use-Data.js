import {defineStore} from 'pinia'


export const useDataStore = defineStore("data", {
    state: () => {
        return {
            user : [
                {id: "eej6g0hBVjhoKP9CrVaBO2mDXT93" , name: "John"},
                {id: "zp16215zqHgjbepL2xZg5t0NZQf2", name: "Jane"},
            ],
            data: [
                {
                    id: 1,
                    title: "First Item",
                    description: "This is the first item",
                    category : "High",
                    date: "2021-01-01",
                    image : "https://picsum.photos/200/300",
                    point : 1000,
                    memberCount : 3,
                    member : { 
                        // eej6g0hBVjhoKP9CrVaBO2mDXT93 : {
                        //     name : "John Doe",
                        //     statu : "Todo",
                        // },
                        // zp16215zqHgjbepL2xZg5t0NZQf2 : {
                        //     name : "Jane Doe",
                        //     statu : "Inprogress" || "Backlog",
                        // }
                    }
                },
                {
                    id: 2,
                    title: "Second Item",
                    description: "This is the second item",
                    category : "Medium",
                    date: "2021-01-01",
                    image : "https://picsum.photos/200/300",
                    point : 100,
                    memberCount : 3,
                    member : { 
                      
                    }
                },
                {
                    id: 3,
                    title: "Third Item",
                    description: "This is the Third item",
                    category : "Low",
                    date: "2021-01-01",
                    image : "https://picsum.photos/200/300",
                    point : 100,
                    memberCount : 3,
                    member : { 
                        
                    }
                },
                
            ],
            selected:"",
            isModalActive : false,
        }
    },
    actions: {
        setSelectedData(data) {
            this.selected = data
        },
        getData(statu,id){
            return this.data.filter(item => item.member[id]?.statu === statu)
        },
        StartDragData(event,item){
            event.dataTransfer.dropEffect = "move";
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("id", item.id);
        },
        DropData(event,statu,userID){
            const itemID = event.dataTransfer.getData("id");
            const index = this.data.findIndex(item => item.id === parseInt(itemID))
            this.data[index].member[userID].statu = statu
        },
        setModalChange(){
            this.isModalActive = !this.isModalActive
        },
        setUser(){
            this.data = this.data.map(item => {
                item.member = this.user.reduce((acc,cur) => {
                    acc[cur.id] = {
                        name : cur.name,
                        statu : "Backlog"
                    }
                    return acc
                },{})
                return item
            })
        },
        addTask(data){
            this.data.push(data)
        },
        setFavorite(id){
            const index = this.data.findIndex(item => item.id === id)
            this.data[index].isFavorite = !this.data[index].isFavorite
        },
    },
    getters: {
        getPoint() {
            return this.data.filter(item => item.statu === "Done").reduce((a, b) => a + b.point, 0)
        },
        getCompletedTask () {
            return this.data.filter(item => item.statu === "Done").length
        },
        getNotCompletedTask () {
            return this.data.filter(item => item.statu !== "Done").length
        },
    }
})