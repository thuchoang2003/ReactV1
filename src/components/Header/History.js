import { useEffect, useState } from "react";
import { getHistory } from "../../services/userServices.js";
import Table from "react-bootstrap/Table";
const History = (props) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let dataClone = [];
      let dataTmp = res.DT.data;
      for (let i = 0; i < dataTmp.length; i++) {
        let object = {
          total_questions: dataTmp[i].total_questions,
          total_correct: dataTmp[i].total_correct,
          name: dataTmp[i].quizHistory.name,
        };
        console.log(object);
        dataClone.push(object);
      }
      setData(dataClone);
    }
  };
  const calcScore = (total_correct, total_questions) => {
    return (+total_correct / +total_questions).toFixed(1);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Total Question</th>
            <th>Total Correct Question</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
          </tr> */}
          {data &&
            data.length &&
            data.map((item, index) => {
              return (
                <tr>
                  <id>{index + 1}</id>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{calcScore(item.total_correct, item.total_questions)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default History;
