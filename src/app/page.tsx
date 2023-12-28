

export default function Home () {
  //const session = await auth();

  return (
    <>
      <div className="relative flex flex-col p-5 gap-0 text-xl z-10">
        <div className="self-start mt-44 text-5xl p-5">
          找到附近的朋友，一起吃飯吧！
        </div>     
        <div className="self-start text-lg p-5 pt-1">
          FOOD DATE 是一款食物社交平台，你可以在這裡找到附近的朋友，探索新的餐廳。
        </div>   
      </div>
      <div className="fixed right-[-20rem] bottom-[-41rem] w-[75rem] h-[75rem] rounded-full bg-blue-400 z-0" />
    </>
  );
}