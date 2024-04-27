import Avatar from "./Avatar";

export default function Friends() {
  return (
    <div className="flex flex-wrap gap-4">
      <Avatar/>
      <div>
        <h3 className = "font-bold text -xl">Nan Puang</h3>
        <div className = "text-sm leading-3"> 3 mutual Friends
        </div>
      </div> 
    </div>
      );
}