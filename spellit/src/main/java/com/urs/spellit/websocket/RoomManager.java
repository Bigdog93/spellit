package com.urs.spellit.websocket;

import com.urs.spellit.websocket.dto.PlayerDto;
import com.urs.spellit.websocket.dto.RoomInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class RoomManager {
    private long roomCount;
    private Map<Long, RoomInfo> roomMap = new HashMap<>();

    public RoomInfo makeRoom(PlayerDto playerDto1) {
        RoomInfo room = new RoomInfo();
        room.setPlayerList(new ArrayList<>());
        room.setRoomId(roomCount++);
        room.setCost(8);
        room.getPlayerList().add(playerDto1);
        roomMap.put(room.getRoomId(), room);
        return room;
    }
    public RoomInfo makeRoom(PlayerDto playerDto1, PlayerDto playerDto2) {
        RoomInfo room = new RoomInfo();
        room.setPlayerList(new ArrayList<>());
        room.setRoomId(roomCount++);
        room.setCost(8);
        room.getPlayerList().add(playerDto1);
        room.getPlayerList().add(playerDto2);
        roomMap.put(room.getRoomId(), room);
        return room;
    }
    public RoomInfo getRoomInfo(long roomId) {
        return roomMap.get(roomId);
    }
    public List<PlayerDto> getPlayers(long roomId) {
        return roomMap.get(roomId).getPlayerList();
    }


    public void clearRoom(long roomId) {
        roomMap.remove(roomId);
    }

    public PlayerDto[] dropSession(WebSocketSession session) {
        for(RoomInfo room : roomMap.values()) {
            for(PlayerDto p : room.getPlayerList()) {
                if(p.getSession().equals(session)) {
                    room.getPlayerList().remove(p);
                    PlayerDto remainPlayer = room.getPlayerList().remove(0);
                    clearRoom(room.getRoomId());
                    room = null;
                    return new PlayerDto[]{p, remainPlayer};
                }
            }
        }
        return null;
    }
}
