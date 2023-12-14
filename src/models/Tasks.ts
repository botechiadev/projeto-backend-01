export class Tasks{
    constructor(
    private readonly id:string,
    private title: string,
    private description: string,
    private status: 0|1|2|3,    
    private author: string,
    private createdAt: string,
    private updateAt: string,

    ){}
    public getId():string{
        return this.id
    }
 
    public getTitle():string{
    return this.title
    }
    public getDescription():string{
      return this.description
   }
   public getAuthor():string{
    return this.author
 }
   public getCreatedAt():string{
    return this.createdAt
  }
  public getUpdateAt():string{
        return this.updateAt
  }
  public getStatus(): 0|1|2|3{
        return this.status
  }
  public setTitle(value:string):void{
      this.title= value
  }
  public setDescription(value:string):void{
        this.description= value
  }  
  public seUpdatedAt(value:string):void{
     this.updateAt= value
  }
  public setStatus(value:0|1|2|3):void{
          this.status= value
        }
  public setAuthor(value:string):void{
              this.author= value
}  
}