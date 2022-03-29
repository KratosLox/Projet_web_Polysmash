CREATE DATABASE Polysmash;

drop table smashuser;
drop table smashcharacter;
drop table smashGame;
drop table maitrise;
drop table smashlevel;
drop table blacklist;
drop table tournoi;
drop table participation;
drop table match;

CREATE TABLE smashuser (
    idsmash serial PRIMARY KEY NOT NULL,
    pseudo varchar(255) NOT NULL,
    mail varchar(255) NOT NULL,
    pssworduser varchar(255) NOT NULL,
    friendcode varchar(255),
    adminator boolean NOT NULL,
    isbanned boolean NOT NULL,
    UNIQUE (mail),
    UNIQUE(friendcode)

);

CREATE TABLE smashcharacter (
    idperso serial PRIMARY KEY NOT NULL,
    nomperso varchar(255) NOT NULL,
    apparition int NOT NULL,
    FOREIGN KEY (apparition) REFERENCES smashGame(idgame)
);

CREATE TABLE smashGame(
    idgame serial PRIMARY KEY NOT NULL,
    nom varchar(255)
);

CREATE TABLE smashlevel(
    idtable serial PRIMARY KEY NOT NULL,
    idcreateur INT NOT NULL,
    idpersonnage INT NOT NULL,
    rang varchar(1),
    FOREIGN KEY (idcreateur) REFERENCES smashuser(idsmash),
    FOREIGN KEY (idpersonnage) REFERENCES smashcharacter(idperso)
);

CREATE TABLE tournoi (
    idTournoi serial PRIMARY KEY NOT NULL,
    idcreateurTournoi INT,
    dateCreation DATE,
    dateDeb DATE,
    dateFin DATE,
    nbParticipant INT,
    idjeux INT,
    FOREIGN KEY (idcreateurTournoi) REFERENCES smashuser(idsmash),
    FOREIGN KEY (idjeux) REFERENCES smashGame(idgame)
);

CREATE TABLE participation(
    idParticipant serial PRIMARY KEY NOT NULL,
    classement INT,
    idjoueur INT NOT NULL,
    idtournoi INT NOT NULL,
    FOREIGN KEY (idjoueur) REFERENCES smashuser(idsmash),
    FOREIGN KEY (idtournoi) REFERENCES tournoi(idTournoi)
);
CREATE TABLE match(
    idMatch serial PRIMARY KEY NOT NULL,
    pseudoGagnant varchar(255),
    tournoi INT NOT NULL,
    idgagnant INT NOT NULL,
    idperdant INT NOT NULL,
    FOREIGN KEY (tournoi) REFERENCES tournoi(idTournoi),
    FOREIGN KEY (idgagnant) REFERENCES smashuser(idsmash),
    FOREIGN KEY (idperdant) REFERENCES smashuser(idsmash)
);