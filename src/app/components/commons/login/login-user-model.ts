//默认是public类型
export class LoginUserModel {
  constructor(
    public name: string,
    public password:string
  ) {  }
}
// You can create a new hero like this:
/*
let myHero =  new LoginUserModel(42, 'liuqiang',
  'Fetch any object at any distance');
console.log('My hero is called ' + myHero.name);
*/
// "My hero is called SkyDog"
