export default function SimpleRow() {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col w-3/4 border">
        <div className="flex border-b">
          <div className="w-1/5 p-1 border-r">aaa</div>
          <div className="w-4/5 p-1">iiii</div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 border-r">
            <div className="w-2/5 p-1 border-r">aaa</div>
            <div className="w-3/5 p-1">iiii</div>
          </div>
          <div className="flex w-1/2">
            <div className="w-2/5 p-1 border-r">aaa</div>
            <div className="w-3/5 p-1">iiii</div>
          </div>
        </div>
      </div>
    </div>
  );
}
