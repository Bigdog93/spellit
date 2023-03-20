package com.urs.spellit.websocket.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class outputDto {
    private String type;
    private Object data;
}
