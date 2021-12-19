import { useRouter } from "next/router";
import  Head  from "next/head";

export default function TodosData({ car }) {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>
          {car.id}
        </title>
      </Head>
      <h2> {car.title}</h2>
      <h3>{car.status?"Done":"Pending"}</h3>
    </div>
  );
}

export async function getServerSideProps({params}){
    const req = await fetch(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${params.id}`);
    const data = await req.json();
  
    return {
      props: { car: data },
    };  
}

// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: { car: data },
//   };
// }

// export async function getStaticPaths() {
//   const req = await fetch("http://localhost:3000/cars.json");
//   const data = await req.json();

//   const paths = data.map((item) => {
//     return { params: { id: item } };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }
