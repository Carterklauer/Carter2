// server.js
// where your node app starts

// init project
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const cookieSession = require("cookie-session")
const fs = require("fs")
// Initialize Database.
const Database = require("./src/sqlite.js")
const DefaultAdminUsers=JSON.parse(fs.readFileSync("admin-users.json"))
const env = process.env
function Login(request, respond) {
  //let loginfailedflag=false
  //if(!loginfailedflag){
  console.log(Users)
  for(var i = 0; i < Users.length; i++){
    if(Capitalize(request.body.Email)==Users[i].Email){
      if(request.body.Password==Users[i].Password){
        request.session.Username=Users[i].Username
        console.log(request.session.Username)
        request.session.Name=Users[i].Name
        request.session.Email=Users[i].Email
        request.session.Account_Type=Users[i].Account_Type
        respond.redirect("https://carter2.glitch.me");
        LoginUser = Users[i]
        
      //Index = i
      }
      return null
    }
  }
  
  respond.redirect("https://carter2.glitch.me");
  
}
function UsersIsEmpty(UserList){
  return UserList.length==0||UserList.length==undefined;
}
function AccountTypeSelection(account_types){
  let choices=`<option value=""></option>`
  if(account_types==[]){
    return choices;
  }else{
    for(let i=0;i<account_types.length;i++){
      choices=choices+'<option value='+account_types[i].Account_Type+'>'+account_types[i].Account_Type+'</option>';
    }
    return choices;
  }
}
function AccountTypeTableExists(account_types){
  return Database.Account_Type_Exists();
}
async function GetUsers(){
  console.log("Getting Users")
  var users=await Database.GetUsers();
  return users;
}
function GetUser(UserInfo){
  let userInfo;
  if(UserInfo.length==0){
    return "<p>No User has that Username.</p>";
  }else{
    if(UserInfo[0].email==null){
      userInfo="<table><tr><td>"+UserInfo[0].Name+"</td><td>"+UserInfo[0].Username+"</td><td>"+UserInfo[0].Password+"</td><td>"+UserInfo[0].Account_Type+"</td></tr></table>";
      return userInfo;
    }else{
      userInfo="<table><tr><td>"+UserInfo[0].Name+"</td><td>"+UserInfo[0].Username+"</td><td>"+UserInfo[0].Email+"</td><td>"+UserInfo[0].Password+"</td><td>"+UserInfo[0].Account_Type+"</td></tr></table>";
      return userInfo;}
  }
}
function SetRecentLogins(){
  return []
}
//var RecentLogins=SetRecentLogins()

function SetRecentLoginForm(RecentLogins){
  let recentLogins=""
  
  for(let i=0;i<RecentLogins.length;i++){
    recentLogins=recentLogins+'<input name="RecentLogins" type="submit" value='+RecentLogins[i].Username+'>'
  }
  return recentLogins;
}

app.use(bodyParser())
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: [env.KEY1, env.KEY2, env.KEY3, env.KEY4],
    
  })
);
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
})
// listen for requests :)

var Users
var LoginUser=[]
var Index
var usersIsEmpty
var AccountTypes=[]
var UserEmail
var UserResult
var User

function DisplayUsers(UserList){ let Users2="<table><tr><td>Name</td><td>Username</td><td>Email</td><td>Password</td><td>Account Type</td></tr>"
if(UserList==[]){
  return ""
};
  for(var i=0; i<Users.length; i++){
    if(UserList[i].Email==null){
       Users2= Users2+"<tr><td>"+UserList[i].Name+"</td><td>"+UserList[i].Username+"</td><td></td><td>"+UserList[i].Password+"</td><td>"+UserList[i].Account_Type+"</td></tr>"
    }else{
      Users2= Users2+"<tr><td>"+ UserList[i].Name+"</td><td>"+UserList[i].Username+"</td><td>"+UserList[i].Email+"</td><td>"+UserList[i].Password+"</td><td>"+UserList[i].Account_Type+"</td></tr>"
    }
  }
  return Users2+"</table>"
}
function Capitalize(lowerWord){
  if(lowerWord==null||undefined||""){
    return null;
  }
  lowerWord=lowerWord.toLowerCase();
  var capitalWord= lowerWord.substring(0,1).toUpperCase()+lowerWord.substring(1,lowerWord.length);
  return capitalWord;
}
function Splice(string, character){
  let endResult=""
  if(string==""){
    return string
  }else{
    let index=0;
    let flag=false;
    for(let i=0;i<string.length;i++){
      if(string[i]==character){
        flag=true;
      }else if(flag){
        endResult=endResult+string[i];
      }
    }
    return endResult;
  }
}
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://carter2.glitch.me'); // Replace with your client's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

app.get("/account-home", function (request, respond) {
  respond.sendFile(__dirname + "/public/account-home.html");
});
app.get("/account-type", function(request, respond){
  respond.sendFile(__dirname+"/Administrator/account-types-home.html");
})
app.get("/add-account-type", function(request, respond){
  respond.sendFile(__dirname+"/Administrator/add-account-type.html");
})
app.get("/administrator", function(request, respond){
  respond.sendFile(__dirname+"/Administrator/administrator-dashboard.html")
})
app.get("/admin-change-password", function(request,respond){
  respond.sendFile(__dirname+"/Administrator/admin-change-password.html")
})
app.get("/administrator-login", function(request, respond){
  respond.sendFile(__dirname+"/public/administrator-login.html")
})
app.get("/administrator-login2",function(request,respond){
  respond.sendFile(__dirname+"/public/administrator-login2.html")
})
/*app.get("/administrator-app-login",async function(request,respond){
  var url=request.url
  var username=Splice(url,"?")
  var result=await Database.Get()
  respond.send()
})*/
app.get("/admin-delete-user",function(request,respond){
  if(request.session.Account_Type=="Owner"||request.session.Account_Type=="Administrator"){
    respond.sendFile(__dirname+"/Administrator/administrator-delete-user.html")
  }else{}
})
app.get("/administrator/settings",function(request,respond){
  if(request.session.Account_Type=="Owner"){
    respond.sendFile(__dirname+"/Administrator/owner-site-settings.html");
  }else{
    respond.redirect("/");
  }
})
app.get("/app", function(request, respond){
  respond.redirect("https://1drv.ms/f/s!AmhD2b0t6vfjmVta1l1UwxQbnQpw?e=ETAz5x")
})
app.get("/bitcoin-well",function(request,respond){
  respond.redirect("https://bitcoinwell.com/referral/carterk2");
})
app.get("/change-password", function(request, respond){
  respond.sendFile(__dirname+"/public/change-password.html")
})
app.get("/clear-user", function(request, respond){
  UserResult=null;
  respond.redirect("/search-users")
})
app.get("/colton", function(request, respond) {
  if(request.session.Account_Type=="Owner"||request.session.Account_Type=="Administrator"||request.session.Account_Type=="Friend"){
    respond.sendFile(__dirname + "/Friends-content/colton-engel.html");
  }else{
    respond.redirect("/")
  }
})
app.get("/colton/nissan-trucks", function(request, respond){
   if(request.session.Account_Type=="Owner"||request.session.Account_Type=="Administrator"||request.session.Account_Type=="Friend"){
    respond.sendFile(__dirname+"/Friends-content/coltons-trucks.html")
  }else{
    respond.redirect("/")
  }
});
app.get("/content", function (request, respond) {
  respond.sendFile(__dirname + "/public/content.html");
});
app.get("/create-site-settings", async function(request,respond){
  if(request.session.Account_Type=="Owner"){
  await Database.InitiateSiteSettings()
  respond.redirect("/administrator/settings")
  }else{
    respond.redirect("/administrator/settings")
  }
  
})
/*app.get("/delete-request-table", async(request, respond)=>{
  await Database.DeleteRequests()
  respond.redirect("/requests-home")
})*/
app.get("/discord-server",function(request,respond){
  respond.redirect("https://discord.gg/HKcjqDddEc")
})
app.get("/friends-content", function (request, respond) {
  if(request.session.Account_Type=="Owner"||request.session.Account_Type=="Administrator"||request.session.Account_Type=="Friend"){
    respond.sendFile(__dirname + "/Friends-content/friends-content.html");
  }else{
    respond.redirect("/")
  }
});
app.get("/friends-content/truck", function (request, respond) {
  if(request.session.Account_Type=="Owner"||request.session.Account_Type=="Administrator"||request.session.Account_Type=="Friend"){
    respond.sendFile(__dirname + "/Friends-content/my-next-car-is-going-to-be-a-truck.html");
  }else{
    respond.redirect("/")
  }
}
)
app.get("/get-administrator-login", function(request, respond){
  respond.redirect("/administrator-login")
})
app.get("/get-current-user",  function(request,respond){
  if(LoginUser.Username!==null){
    respond.send([{"User":LoginUser.Username}])
    console.log(LoginUser.Username+" is Logged in")
  }else{
    respond.send([])
  }
})
app.get("/get-login", function(request, respond){
  respond.redirect("/login");
});
app.get("/get-user-home",function(request, respond){
  respond.sendFile(__dirname+"/Administrator/GetUser/get-user-home.html")
})
app.get("/get-users", function(request, respond){
  respond.sendFile(__dirname+"/public/users.html")
})
app.get("/getsettings",async function(request,respond){
  respond.send(await Database.GetSettings())
})
app.get("/initialize-users", async(request, respond)=>{
  if(request.session.Username=="Carter"){
    /*let exitcode= await Database.InitializeUsers();
    if(exitcode==0){
      respond.redirect("/administrator");
    }else{
      respond.redirect("/administrator?initusersfailed=true");
    }*/
  }else{
    respond.redirect("/");
  }})
app.get("/init-account-types", async(request, respond)=>{
  let exitcode=await Database.CreateAccountTypeTable()
  if(exitcode==0){
    respond.redirect("/administrator");
  }else{
    respond.redirect("/administrator?failed=true");
  }
})

app.get("/login-username", function(request, respond){
  let siteUnderConstruction
  respond.sendFile(__dirname+"/public/login-username.html");
})
app.get("/logout", function (request, respond) {
  request.session.Account_Type = null;
  request.session.Username= null;
  request.session.Name=null;
  request.session.Email=null;
  request.session.Profile_Pic=null;
  respond.redirect("/");
  LoginUser=null
});
app.get("login-pass",function(request,respond){
  respond.sendFile(__dirname+"/public/login-pass.html")
})
app.get("/mandatory-pass-change", function(request, respond){
  respond.sendFile(__dirname+"/public/mandatory-password-change.html")
})
app.get("/new-account", function(request, respond){
  respond.sendFile(__dirname+"/public/new-account.html")
})
app.get("/requests-home",function(request, respond){
  respond.sendFile(__dirname+"/public/requests.html");
})
app.get("/owner-login", function(request,respond){
  respond.sendFile(__dirname+"/public/owner-login.html")
})
app.get("/press-release-10-6-2024",function(request,respond){
  respond.redirect("https://1drv.ms/w/c/e3f7ea2dbdd94368/EWoMtTYMpdBGui_eiw_CFfoBR_YS4MCAW0AzSZHmmlIjKg?e=GBvJGY")
})
app.get("/promotions",function(request,respond){
  respond.sendFile(__dirname+"/public/promotions.html")
})
app.get("/search-users", function(request,respond){
  respond.sendFile(__dirname+"/Administrator/GetUser/search-for-user.html");
})

app.post("/public-can-create-accounts",function(request, respond){
  if(request.body.PCCA=="Off"){
    //Database.ChangeSetting("Public Can Create Accounts","Off");
  }else if(request.body.PCCA=="Test"){
    Database.ChangeSetting("Public Can Create Accounts","Test");
  }else if(request.body.PCCA=="On"){
    //Database.ChangeSetting("Public Can Create Accounts","On")
  }
  respond.redirect("/administrator/settings")
})
/*app.post("/site-under-construction",async function(request, respond){
  if(request.body.Construction=="On"){
    await Database.ChangeSetting("Site Under Construction", "On")
    respond.redirect("/administrator/settings");
  }else if(request.body.Construction=="Off"){
    await Database.ChangeSetting("Site Under Construction", "Off");
    respond.redirect("/administrator/settings");
  }else if(request.body.Construction=="Warn"){
    await Database.ChangeSetting("Site Under Construction", "Warn");
    respond.redirect("/administrator/settings");
  }
  else{
    respond.redirect("/administrator/settings");
  }
})

app.post("/recent-login", function(request, respond){
  let login_user=request.body.RecentLogins
  let loginfailedflag=false
  if(!loginfailedflag){
    for(let i=0;i<RecentLogins.length;i++){
      if(login_user==RecentLogins[i].Username){
        Index=RecentLogins[i].Index
        LoginUser=Users[Index]
        respond.redirect("/login-pass")
        return null;
      }
    }loginfailedflag=true
    if(loginfailedflag){
      respond.redirect("/login?failed=true")
    }
  }else{
    respond.redirect("/login?failed=true")
  }
})*/
app.post("/login", async function(request, respond){
  Users=await GetUsers()
  Login(request, respond)
})

app.post("/login2", function(request, respond){
  if(Users[Index].Password==request.body.Password){
    request.session.UserName=LoginUser.Username
    request.session.Name=LoginUser.Name
    request.session.Email=LoginUser.Email
    request.session.Account_Type=LoginUser.Account_Type
    if(LoginUser.Password=="Password!"){
      Index=null;
      respond.redirect("/mandatory-pass-change");
    }else{
      if(RecentLogins.length==0){
        RecentLogins.push({"Username":LoginUser.Username, "Email":LoginUser.Email,"Index":Index})
        //env.RecentLogins=request.session.RecentLogins
        LoginUser=null
        Index=null;
        respond.redirect("/");
      }else{
        for(var i=0;i<RecentLogins.length;i++){
          if(RecentLogins[i].Username==LoginUser.Username){
            LoginUser=null;
            Index=null;
            respond.redirect("/");
            return null
          }
        }
        RecentLogins.push({"Username":Users[Index].Username, "Email":Users[Index].Email, "Index":Index})
        LoginUser=null
        Index=null;
        respond.redirect("/");
      }
    }
  }else
  respond.redirect("/login-pass?passwordfailed=true");
})
app.post("/admin-login", function(request, respond){
  if (request.body.Password== DefaultAdminUsers[0].Password){
    request.session.Username=DefaultAdminUsers[0].Username
    request.session.Name=DefaultAdminUsers[0].Name
    request.session.Email=DefaultAdminUsers[0].Email
    request.session.Account_Type=DefaultAdminUsers[0].Account_Type
    request.session.Profile_Pic=DefaultAdminUsers[0].Profile_Pic
    User=DefaultAdminUsers[0]
    respond.redirect("/login-confirmed.html");
  }else{
      respond.redirect("owner-login?failed=true")
  }
})

app.post("/administrator-accounttype-selection",function(request, respond){
  if(request.body.AdministratorLogin=="Owner"){
    respond.redirect("/owner-login")
  }else if(request.body.AdministratorLogin=="Administrator"){
    respond.redirect("/administrator-login2")
  }
})

app.post("/change-pass", async function(request, respond){
  var currentPassword=await Database.GetUserPassword(request.session.Username);
  if(request.body.CurrentPassword == currentPassword[0].Password){
    if(request.body.NewPassword.substring(0,8).toLowerCase!="password"&&request.body.NewPassword===request.body.ConfirmNewPassword){
      //await Database.ChangePassword(request.body.NewPassword, request.session.Username)
      respond.redirect("/account-home")
    }else{
      respond.redirect("/change-password?passworddoesnotmatch=true")
    }
  }else{
    respond.redirect("/change-password?currentpasswordmissedmatched=true")
  }
})
app.post("/mandatory-password", async function(request, respond){
  if(request.body.NewPassword.substring(0,8).toLowerCase()!="password"){
    if(request.body.NewPassword==request.body.ConfirmNewPassword){
      await Database.ChangePassword(request.body.NewPassword, LoginUser.Username)
      LoginUser=null;
      respond.redirect("/");
    }else{
      respond.redirect("/mandatory-pass-change?badmatch=true")
    }
  }else{
    respond.redirect("/mandatory-pass-change?falied=true")
  }
})
// Public new account
app.post("/new-account", async function(request, respond){
  let Account_Type="Standard"
  let PCCAList= await Database.GetSpecificSetting("Public Can Create Accounts")
  let PCCA=PCCAList[0].Stat
  for(var i=0; i<Users.length;i++){
    if(Users[i].UserName==request.body.NewUser){
      respond.redirect("/?faultyinfo=true")
    }
  }if(request.body.NewUserPassword==request.body.ConfirmNewPassword){
    if(PCCA=="On"||PCCA=="Test"){
      await Database.AddUser(Capitalize(request.body.NewUser), request.body.Name, Capitalize(request.body.NewUserEmail), request.body.NewUserPassword, Account_Type);
      if(PCCA=="On"){
        request.session.Username=request.body.NewUser;
        request.session.Email=request.body.NewUserEmail;
        request.session.Account_Type=Account_Type;
      }
      console.log(await Database.GetUsers())
      respond.redirect("/");
    }else{
      console.log("Creating Account Failed")
    respond.redirect("/");
  }
  }else{
    respond.redirect("/?passwordmismatched=true")
  }
})
app.post("/delete-account", async function(request, respond){
  if((Database.GetUserAccountType(request.body.Username)!=="Owner"||Database.GetUserAccountType(request.body.Username)!=="Administrator")||((Database.GetUserAccountType(Database.GetUserAccountType(request.body.Username)!="Owner")&&request.session.Username=="Carter"))){
    var exitcode=await Database.DeleteUser(Capitalize(request.body.DelUsername))
    if(exitcode==0){
    respond.redirect("/administrator")
    }else{
      respond.redirect("/delete-user.html?failed=true")}
  }else{
    respond.redirect("/delete-user.html?cantdeleteaccount=true")
  }
})
app.post("/search-user", async function(request,respond){
  let userInfo
  if(request.session.Account_Type=="Owner"){
    userInfo=await Database.GetUserInfo(request.body.Username)
    UserResult=GetUser(userInfo)
    respond.redirect("/search-users?success=true")
  }else if(request.session.Account_Type="Administrator"){
    userInfo= await Database.GetUserInfoAdmin(request.body.Username);
    UserResult=GetUser(userInfo)
    respond.redirect("/search-users?success=true")
  }
})
