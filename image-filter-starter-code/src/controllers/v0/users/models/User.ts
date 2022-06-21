export class User  {
  
  public email: string;
  public password_hash: string; // for nullable fields

  constructor(email: string, password_hash: string){
    this.email = email;  
  this.password_hash = password_hash; 
  }

}
