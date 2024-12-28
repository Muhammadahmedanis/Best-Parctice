// import { useEffect, useState } from 'react';

// const JokeItem = ({ joke }) => {
//   return (
//     <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
//       <h2 className='text-xl font-bold'>{joke.value}</h2>
//     </div>
//   );
// };

// const Joke = () => {
//   const [joke, setJoke] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchJoke = async () => {
//       try {
//         const res = await fetch('https://api.chucknorris.io/jokes/random');
//         const data = await res.json();
//         setJoke(data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJoke();
//   }, []);

//   if (loading) {
//     return <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>;
//   }

//   return <JokeItem joke={joke} />;
// };
// export default Joke;

import { use, Suspense } from 'react';
// const fetchData = fetch('https://api.chucknorris.io/jokes/random').then(res => res.json());
// const JokeItem = () => {
//     const joke = use(fetchData);
//     return (
//       <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
//         <h2 className='text-xl font-bold'>{joke.value}</h2>
//       </div>
//     );
//   };
  
//   const Joke = () => {
//     return (
//       <Suspense fallback={ <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>}>
//         <JokeItem />
//       </Suspense>
//     );
//   };

// const fetchData = fetch('https://api.chucknorris.io/jokes/random').then(res => res.json());
// function JokeItem (){
//     const joke = use(fetchData);
//     return (
//       <div className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
//         <h2 className='text-xl font-bold'>{joke.value}</h2>
//       </div>
//     );
//   };
// export default JokeItem;






// const fetchMessage = () => {
//     return new Promise((resolve) => setTimeout(resolve, 1000, '**************'))
// }

// const Message = () => {
//     const[msgPromise, setMsgPromise] = useState(null);
//     const[show, setShow] = useState(false);

//     const download = () => {
//         setMsgPromise(fetchMessage());
//         setShow(true);
//     }
//     if(show){
//         return <MsgContainer msgPrpmise={msgPromise}/>
//     }else{
//         return(
//             <button onClick={download}>Download message</button>
//         )
//     }
// }

// const MsgContainer = ({msgPrpmise}) => {
//     return(
//         <Suspense fallback={<p>Downloading....</p>}>
//             <MsgOutput msgPromise={msgPrpmise} />
//         </Suspense>
//     )
// }

// const MsgOutput = ({msgPromise}) => {
//     const content = use(msgPromise);
//     return <p>{content}</p>
// }

// export { Message as Joke};