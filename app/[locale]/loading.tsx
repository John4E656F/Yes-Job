const Loading = () => {
  return (
    <div className={`h-screen flex justify-center items-center`}>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-4'>Loading...</h1>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    </div>
  );
};

export default Loading;
