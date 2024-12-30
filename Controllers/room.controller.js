const Room = require("../Models/room");
const roomController = {};

// 모든 방 목록 가져오기
roomController.getAllRooms = async () => {
  const roomList = await Room.find({});
  return roomList;
};

// 특정 방에 유저 참여 처리
roomController.joinRoom = async (roomId, user) =>{
  const room = await Room.findById(roomId);
  if(!room) {
    throw new Error("해당 방이 없습니다.");
  }
  if(!room.members.includes(user._id)) {
    room.members.push(user._id); // 유저를 members 배열에 추가
    await room.save(); // 변경사항 저장
  }
  user.room = roomId; // 유저의 현재 방 정보 업데이트
  await user.save(); // 변경사항 저장
};
module.exports = roomController;