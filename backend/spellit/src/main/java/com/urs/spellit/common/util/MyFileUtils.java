package com.urs.spellit.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Objects;
import java.util.UUID;

@Component
public class MyFileUtils {

    Logger logger = LoggerFactory.getLogger(MyFileUtils.class);

    @Value("${spring.servlet.multipart.location}") //
    private String uploadFilePath;

    // make folder
    public boolean makeFolders(String path) {
        File folder = new File(path);
        return folder.mkdirs();
    }

    // make save path
    public String getSavePath(String path) {
        return uploadFilePath + "/" + path;
    }

    // make random file name
    public String getRandomFileNm() {
        return UUID.randomUUID().toString();
    }

    // make random file name(with ext)
    public String getRandomFileNm(String originNm) {
        return getRandomFileNm() + "." + getExt(originNm);
    }

    // make random file name(first)
    public String getRandomFileNm(MultipartFile file) {
        return getRandomFileNm(file.getOriginalFilename());
    }

    // get ext
    public String getExt(String fileNm) {
        return StringUtils.getFilenameExtension(fileNm);
    }

    // save file & return random file name
    public String transferTo(MultipartFile mf, String target) { // target : "profile/userPk"
        String fileNm = getRandomFileNm(mf);
        String basePath = getSavePath(target);

        File origin = new File(basePath);
        if( origin.exists() ){ //파일존재여부확인
            if(origin.isDirectory()){ //파일이 디렉토리인지 확인
                File[] files = origin.listFiles();
                for(int i = 0; i< Objects.requireNonNull(files).length; i++){
                    if( files[i].delete() ) {
                        System.out.println(files[i].getName()+" 삭제성공");
                    }else{
                        System.out.println(files[i].getName()+" 삭제실패");
                    }
                }
            }
            if(origin.delete()) {
                System.out.println("파일삭제 성공");
            }else{
                System.out.println("파일삭제 실패");
            }
        }else{ System.out.println("파일이 존재하지 않습니다."); }

        makeFolders(basePath);
        File saveFile = new File(basePath, fileNm);
        try{
            logger.info(basePath + "/" + fileNm);
            mf.transferTo(saveFile);
            logger.info("위 경로로 파일 업로드 완료");
            return fileNm;
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
