function SharedCollectionHeader({ title, description, authorProfile }) {
  return (
    <header className="w-full h-[30vh] shadow-lg bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-900 dark:to-indigo-800">
      <div className="w-full h-full grid items-center px-5 md:px-10">
        <div>
          <div className="flex justify-center items-center gap-2">
            <h1 className="font-bold text-4xl md:text-5xl">{title}</h1>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </header>
  );
}

export default SharedCollectionHeader;
