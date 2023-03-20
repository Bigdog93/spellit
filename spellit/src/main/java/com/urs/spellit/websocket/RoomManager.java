package com.urs.spellit.websocket;

import com.urs.spellit.websocket.dto.PlayerDto;
import com.urs.spellit.websocket.dto.RoomInfo;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class RoomManager {
    private int roomCount;
    private Map<Integer, RoomInfo> roomMap = new HashMap<>();

    public RoomInfo makeRoom(PlayerDto playerDto1,PlayerDto playerDto2) {
        RoomInfo room = new RoomInfo();
        room.setRoomId(roomCount++);
        room.getPlayerList().add(playerDto1);
        room.getPlayerList().add(playerDto2);
        roomMap.put(room.getRoomId(), room);
        return room;
    }

    public void clearRoom(int roomId) {
        roomMap.remove(roomId);
    }
}
