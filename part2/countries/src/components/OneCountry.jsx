import UnLists from './UnLists';

const OneCountry = ({ obj }) => {
  let lang = Object.values(obj.languages);
  return (
    <div>
      <h1> {obj.name.common} </h1>
      <p style={{ margin: 0 }}>capital {obj.capital[0]}</p>
      <p style={{ margin: 0 }}>area {obj.area}</p>
      <h2>languages: </h2>
      <UnLists ray={lang} />
      <img src={obj.flags.png} alt={obj.flags.alt} />
    </div>
  );
};

export default OneCountry;
