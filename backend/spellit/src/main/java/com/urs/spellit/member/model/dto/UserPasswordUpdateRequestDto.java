package com.urs.spellit.member.model.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserPasswordUpdateRequestDto{

    private String originPassword;
    @NotBlank
    private String password;
    private String passwordConfirm;
}
