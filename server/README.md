1) 

create .env file inside server - 
add your MONGO_URI AND PORT LIKE BELOW 
```
MONGO_URI=mongodb+srv://JACKSPARROW:SAVVY1234@cluster23.AHJDEKL.mongodb.net/
PORT=9002
```

2) TEST IN POSTMAN 

POST http://localhost:9002/schemaless/upload

                BODY 
            FORM-DATA

  KEY                              -           VALUES

  FILE            (SELECT FILE OPTION)- dummydata.xlsx(upload your excel sheet in this format only)
  tenantId                            -  6789362 (Enter ID you want to save)
  tenantName                          -  Meta.inc ( Enter name you want to save along with this id & excell sheet)


  3) I have added lot of console.log for better debugging, remove if not needed.

  4) Clone and make changes as you like , give a star to the repo if it helped.