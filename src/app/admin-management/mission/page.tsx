import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getInProgressMission } from "./_components/action";
import NewMissionForm from "./_components/NewMissionForm";

export default async function AdminMissionPage () {
  const inProgressMission = await getInProgressMission();
  //console.log(inProgressMission);

  function TitleElement(title: string) {
    return <Typography variant="h5" className="mb-2">{title}</Typography>;
  }
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        {TitleElement("新增任務")}
        <NewMissionForm />
      </div>
      <div>
        {TitleElement("進行中的任務")}
        <Table stickyHeader sx={{ minWidth: 650 }} className="border border-gray-800">
          <TableHead className="bg-gray-700">
            <TableRow>
              <TableCell align="left">任務名稱</TableCell>
              <TableCell align="left">任務描述</TableCell>
              <TableCell align="left">指定餐廳Id</TableCell>
              <TableCell align="left">任務獎勵</TableCell>
              <TableCell align="left">開始時間</TableCell>
              <TableCell align="left">結束時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inProgressMission.map((mission) => (
              <TableRow
                key={mission.missionId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {mission.missionName}
                </TableCell>
                <TableCell align="left">{mission.missionDescription ?? "null"}</TableCell>
                <TableCell align="left">{mission.relatedPlaceId ?? "null"}</TableCell>
                <TableCell align="left">{mission.prize}</TableCell>
                <TableCell align="left">{mission.startAt.toLocaleString()}</TableCell>
                <TableCell align="left">{mission.endAt.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>        
      </div>
    </div>
  );
}