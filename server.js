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
    keys: [env.KEY1, env.KEY2, env.KEY3, env.KEY4,env.RecentLogins],
    
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
var RecentLogins=SetRecentLogins()

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
app.get("/administrator-app-login",async function(request,respond){
 /* var url=request.url
  var username=Splice(url,"?")
  var result=await Database.Get()
  respond.send()*/
})
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
app.get("/create-requests", async(request, respond)=>{
  let exitcode=Database.CreateRequestTable();
  if(exitcode==0){
    respond.redirect("/requests");
  }else{
    respond.redirect("/requests?failed=true");
  }
})
app.get("/create-site-settings", async function(request,respond){
  if(request.session.Account_Type=="Owner"){
  await Database.InitiateSiteSettings()
  respond.redirect("/administrator/settings")
  }else{
    respond.redirect("/administrator/settings")
  }
  
})
app.get("/delete-request-table", async(request, respond)=>{
  await Database.DeleteRequests()
  respond.redirect("/requests-home")
})
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
    let exitcode= await Database.InitializeUsers();
    if(exitcode==0){
      respond.redirect("/administrator");
    }else{
      respond.redirect("/administrator?initusersfailed=true");
    }
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
    Database.ChangeSetting("Public Can Create Accounts","Off");
  }else if(request.body.PCCA=="Test"){
    Database.ChangeSetting("Public Can Create Accounts","Test");
  }else if(request.body.PCCA=="On"){
    Database.ChangeSetting("Public Can Create Accounts","On")
  }
  respond.redirect("/administrator/settings")
})
app.post("/site-under-construction",async function(request, respond){
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
})
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
      RecentLogins.push({"Username":LoginUser.Username, "Email":LoginUser.Email,"Index":Index})
      //env.RecentLogins.push({"Username":LoginUser.Username, "Email":LoginUser.Email,"Index":Index})
      Index=null;
      env.RecentLogins=request.session.RecentLogins;
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
      await Database.ChangePassword(request.body.NewPassword, request.session.Username)
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

app.get("/load", async function(request, respond){
  Users=await GetUsers()
  AccountTypes=await Database.GetAccountType();
  var id = request.query.id;
  if (id == "header") {
    if (request.session.Account_Type !== null&&request.session.Account_Type!==undefined) {
      if(request.session.Username=="Carter"){
        respond.send(`<ul class="menu">
            <li class="menu"><img src="`+request.session.Profile_Pic+`length="150" width="150" alt="Your Current profile"></li>
            <li class="menu"><button><a class="menu" href="/account-home">Account Home</a></button></li>
            <li class="menu"><p id="username">`+request.session.Name+
            `</p></li>
            <li class="menu"><button><a class="menu" href="/logout">Log out</a></button></li>
            </ul>`)
      }
      else if (request.session.Account_Type == "Administrator"||request.session.Account_Type =="Standard") {
        if(request.session.Profile_Pic!=null){
        respond.send(`<ul class="menu">
          <li class="menu"><details><summary><img src="`+request.session.Profile_Pic+`length="100" width="100" alt="Your Current profile"></summary> <a href="/account-home">Account Home</a></details></li>
            <li class="menu"><p>`+request.session.Name+`</p></li>
            <li class="menu"><button><a class="menu" href="/logout">Log out</a></button></li>
            </ul>`
        )}else{
          respond.send(`<ul class="menu">
            <li class="menu"><button><a class="menu" href="/account-home">`+request.session.Name+
            `</a></button></li>
            <li class="menu"><button><a class="menu" href="/logout">Log out</a></button></li>
            </ul>`
          )
        };
      }
    }else {
      respond.send(``)
    }
  }else if(id=="friends-header"){
        if (request.session.Account_Type != null) {
      if (request.session.Account_Type == "Owner"||"Administrator"||"Friend") {
        if(request.session.Profile_Pic!=null){
        respond.send(
          "<h2>" +
            `<ul class="menu">`+
          `<li class="menu">`+"<img src="+request.session.Profile_Pic+`length="200" width="200" alt="Your Current Profile Picture">`+`</li>`+
            `<li class="menu"><p>`+request.session.Name+
            "</p></li>"+
            '<li class="menu"><button><a class="menu" href="/logout">Log out</a></button></li>' +
            "</ul>" +
            "</h2>"
        )}else{
          respond.send(
          "<h2>" +
            `<ul class="menu">
            <li class="menu"><button><a class="menu" href="/logout">Log out</a></button></li>
            </ul>`
          )
        };
      }else {
        respond.send(`<p></p>`)}
        }
  }else if (id == "account-home") {
    if (request.session.Account_Type =="Owner"){
      respond.send(`
      <header><h1 class="admin">Account Home</h1></header>
      <main>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/get-users">Get Users</a></button></li>
          <li class="menu"><button><a class="menu" href="/change-password">Change Password</a></button></li>
          <li class="menu"><button><a class="menu" href="/administrator">Administrator</a></button></li>  
        </ul>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/friends-content">Friend Content</a></button></li>
        </ul>
      </main>
      `)
    }else if(request.session.Account_Type == "Administrator") {
      respond.send(`<header><h1 class="admin">Account Home</h1></header>
      <main>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/get-users">Get Users</a></button></li>
          <li class="menu"><button><a class="menu" href="/change-password">Change Password</a></button></li>
          <li class="menu"><button><a class="menu" href="/administrator">Administrator</a></button></li>  
        </ul>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/friends-content">Friend Content</a></button></li>
        </ul>
      </main>`);
    }else if (request.session.Account_Type == "Friend") {
      respond.send(` <header><h1 class="content">Account Home</h1></header>
          <main>
            <ul class="menu">
              <li class="menu"><button><a class="menu" href="/friends-content">Friends Content</a></button></li>
            </ul>
          </main>
      `);
    }else if(request.session.Account_Type=="Standard"){
      respond.send(`<header><h1 class="admin">Account Home</h1></header>
      <main>
      <ul class="menu">
      <li class="menu"><button><a class="menu" href="/change-password">Change Password</a></button></li>
      </ul>
      </main>`)
    }else{
      respond.send(`<p> You must be logged in to View Content</p>`)
    }
  }
  else if(id=="change-password"){
    if(request.session.Account_Type!==null&&request.session.Account_Type!==undefined){
      respond.send(`<header><h1>
      Change Password
      </h1></header>
      <main><div style="text-align:center"><form action="/change-pass" method="Post" autocomplete="off">
      <label for="CurrentPassword">Current Password
      <input name="CurrentPassword" type="password" placeholder="Current Password" required>
      <label for="NewPassword">New Password</label>
      <input name="NewPassword" type="text" placeholder="New Password" required>
      <label for="ConfirmNewPassword">Confirm New Password</label>
      <input name="ConfirmNewPassword" type="password" placeholder="Confirm New Password" required>
      <input type="submit" value="Change Password" class="submit" id="change-password">
      </form></div></main>
      `)
    }else{
      respond.send(`<main><p>You must be logged in to view</p></main>`)
    }
  }else if(id=="admin"){
    if(request.session.Account_Type=="Owner"){
      if(usersIsEmpty){
        respond.send(`<header><h1 class="admin">Administrator</h1></header>
        <main>
        <div style="text-align:center"><ul class="menu">
          <li class="menu"><button><a class="menu" href="/new-account">Add an Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/administrator/change-password">Change Password</a></button></li>
          <li class="menu"><button><a class="menu" href="/admin-delete-user">Delete An Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/initialize-users">Initialize Users</a></button></li>
          <li class="menu"><button><a class="menu" href="/requests-home"> Site Request Home</a></button></li>
        </ul></div>
        </main>
        `)
      }else{
        respond.send(`<header><h1 class="admin">Administrator</h1></header>
        <main>
        <div style="text-align:center"><ul class="menu">
          <li class="menu"><button><a class="menu" href="/account-type">Account Type</a></button></li>
          <li class="menu"><button><a class="menu" href="/new-account">Add an Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/admin-change-password">Change Password</a></button></li>
          <li class="menu"><button><a class="menu" href="/admin-delete-user">Delete An Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/get-user-home">Get User Home</a></button></li>
          <li class="menu"><button><a class="menu" href="/requests-home"> Site Request Home</a></button></li>
          <li class="menu"><button><a class="menu" href="/administrator/settings">Site Settings</a></button></li>
        </ul></div>
        </main>`)
      }
    }else if(request.session.Account_Type=="Administrator"){
      respond.send(`
      <main>
      <div style="text-align:center"><ul class="menu">
          <li class="menu"><button><a class="menu" href="/new-account">Add an Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/change-password">Change Password</a></button></li>
          <li class="menu"><button><a class="menu" href="/delete-user.html">Delete An Account</a></button></li>
          <li class="menu"><button><a class="menu" href="/get-user-home">Get User Home</a></button></li>
          <li class="menu"><button><a class="menu" href="/requests-home"> Site Request Home</a></button></li>
        </ul></div>
        </main>
      `)
    }
    else{
      respond.send(`<p> You do not Have Access</p>`)
    }
  }else if(id=="account-type-home"){
    if(request.session.Account_Type=="Owner"){
      respond.send(`<header><h1>Account Types Home</h1></header>
      <main>
        <button type="button"><a href="init-account-types">Initiallize Account Types</button>
      `)
    }
  }
  else if(id=="add-account-type"){
    if(request.session.Username=="Carter"){
      respond.send(`
      <header><h1 class="admin">Add Account Type</h1></header>
      <main>
        <form action="/addaccounttype" method="POST" id=addaccounttype>
          <label for="New_Account_Type">New Account Type</label>
          <input name="New_Account_Type" type="text" placeholder="New Account Type"/>
          <input type="submit" value="Add Account Type"/>
        </form>
      </main>
      `)
    }
  }else if(id=="get-user-home"){
    if(request.session.Username=="Carter"||request.session.Account_Type=="Owner"){
      respond.send(`<header><h1>Get Users Home</h1></header>
      <main>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/get-users">Get Users</a></button></li>
          <li class="menu"><button><a class="menu" href="/search-users"> Search User</a></button></li>
        </ul>
      </main>
      `)
    }else if(request.session.Account_Type=="Administrator"){
      respond.sendFile(`<header><h1>Get Users Home</h1></header>
      <main>
        <ul class="menu">
          <li class="menu"><button><a class="menu" href="/search-user">Search User</a></button></li>
        </ul>
      </main>
      `)
    }
    else{
      respond.send(`
      <main><p>You dont have access</p></main>`)
    }
  }else if(id=="get-users"){
    if(request.session.Account_Type=="Owner"){
        
        respond.send(`<header><h1 class="admin">Users</h1></header><main>`+DisplayUsers(Users)+`</main>`)
    }else{
      respond.send("")
    }
  }else if(id=="search-user"){
    if(request.session.Account_Type=="Owner"||"Administrator"){
      respond.send(`<header><h1>Search for User</h1></header>
      <main>
        <form action="/search-user" method="POST" name="search-user" autocomplete="off">
          <label for="Username">Username</label>
          <input name="Username" type="text" placeholder="Username" id="Username">
          <input type="submit" value="Search">
          </form>
          <br>
          <ul class="menu">
            <li class="menu"><button><a href="/clear-user">Clear User</a></button></li></ul>
        </main>`)
    }
  }else if(id=="user"){
    if(request.session.Account_type=="Owner"||"Administrator"){
      respond.send(UserResult)
    }else if((request.session.Account_type=="Owner"||"Administrator")&&UserResult!==null){
      respond.send(UserResult)
    }
  }else if(id=="super-change-password"){
    if(request.session.Account_Type=="Owner"||"Administrator"){
      respond.send(`<header><h1>Change Password</h1></header>
      <main>
      <form action="/change-pass-admin" method="Post" autocomplete="off">
      Username: <input name="Username" type="text" placeholder="Username" required/>
      New Password: <input name="NewPassword" type="text" placeholder="New Password" required/>
      <input type="submit" value="Change Password"/>
      </form>
      </main>
      `)
    }else{
      respond.send(`<main>
      <p>You must be logged in to view.</p>
      </main>`)
    }
  }else if(id=="recent-login"){
    respond.send(`
    <form action="/recent-login" method="POST" id="recent-login">`+
    SetRecentLoginForm(RecentLogins)+`
     </form>
    `)
  }else if(id=="mandatory-password-change"){
      if(request.session.Account_type=="Owner"||request.session.Account_type=="Administrator"||request.session.Account_type=="Friend"||request.session.Account_type=="Roommate"||request.session.Account_type=="Standard"){
        respond.send(`<form action="/mandatory-password" method="Post" autocomplete="off" id="mandatory-password">
        New Password *: <input name="NewPassword" type="text" placeholder="New Password" required/>
        Confirm New Password * <input name="ConfirmNewPassword" type="password" placeholder="Confirm New Password" required/>
        <input type="submit" value="Change Password"/>
        </form>`)
      }
    }else if(id=="delete-user"){
      if(request.session.Account_Type=="Owner"){
        respond.send(`<form action="/delete-account" method="Post" autocomplete="off" id="delete-account">
        Username*: <input name="DelUsername" type="text" placeholder="Username" required/>
        <input type="submit" value="Delete Account"/>
        </form>`)
    }else{
      respond.send("<p> You must have access to view</p>")
    }}})