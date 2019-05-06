const repositorio_Monitoramento = require('../repositorio/repositorio_Monitoramento');

module.exports={

    exibirDash(){
        return new Promise((resolve,reject)=>{


            repositorio_Monitoramento.selectTodosSensor1().then(rs=>{
           
                var time =[];
                var temp = [];
                var umid = [];
    
              for(i = 0;i < 10;i++){
               var date = new Date(rs.recordset[i].Data_mon);
    
                time[i]=`${date.getHours()+3}:0${date.getMinutes()}:${date.getSeconds()}`
    
    
                temp[i] = rs.recordset[i].Temperatura_Atual;
    
                umid[i] = rs.recordset[i].Umidade_Atual;
              }

              setInterval(function(){

                repositorio_Monitoramento.selectUltimoSensor1().then(resolve=>{
                    var date = new Date(resolve.recordset[0].Data_mon);
    
                    let time=`${date.getHours()+3}:${date.getMinutes()}:${date.getSeconds()}`
        
        
                    let temp = resolve.recordset[0].Temperatura_Atual;
        
                    let umid = resolve.recordset[0].Umidade_Atual;

                    //console.log(rs);

                    console.log(time + ' '+ temp +' '+umid)

                  global.socket.emit('replay',time,temp,umid);

                })

              },6000)
            

              var union = {time,temp,umid}
              console.log(time);
              resolve(union);
            });
                

        });
        

        

    }


}