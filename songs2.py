import csv
import eyed3
import os
import shutil

from pydub import AudioSegment


AUDIO_FILES_DIR_PATH = "/home/mikalai/Desktop/aaa"
AUDIO_FILES = sorted(os.listdir(AUDIO_FILES_DIR_PATH + "/wav"))
AUDIO_FILES_FORMAT = "wav"
CONVERT_FROM_WAV_TO_MP3 = False

SOURCE_FILE_PATH = AUDIO_FILES_DIR_PATH + "/info.csv"


# with open(SOURCE_FILE_PATH, newline='') as csvfile:
#     reader = csv.reader(csvfile, delimiter=',', quotechar='|')
#     header_row = next(reader)  # Read the header row
#     (
#         index_number_header,
#         title_header,
#         album_header,
#         artists_header,
#         year_header,
#         comment_header,
#         locality_header,
#         instruments_header,
#         *rest_headers,
#     ) = header_row

#     for row in reader:
#         (
#             index_number,
#             title,
#             album,
#             artists,
#             year,
#             comment,
#             locality,
#             instruments,
#             *rest,
#         ) = row

with open(SOURCE_FILE_PATH, newline="") as f:
    reader = csv.DictReader(f)
    (
        index_number_header,
        title_header,
        album_header,
        artists_header,
        year_header,
        comment_header,
        locality_header,
        instruments_header,
        *rest_headers,
    ) = reader.fieldnames

    rows = list(reader)
    # print(reader.fieldnames)
    # print(rows)
    # for i in range(3):
    #     print(rows[i][index_number_header] + '. ' + rows[i][title_header])

    print(AUDIO_FILES)
    for file_index, file_name in enumerate(AUDIO_FILES):
        if not file_name.endswith(AUDIO_FILES_FORMAT):
            continue
        print(file_name)
        print(file_index)

        try:
            row = rows[file_index]

        except IndexError:
            print(f"IndexError for file {file_name}. No a row for this file.")
            continue
        else:

            wav_path = os.path.join(AUDIO_FILES_DIR_PATH, "wav", file_name)
            wav_renamed = os.path.join(
                AUDIO_FILES_DIR_PATH,
                "wav_renamed",
                row[index_number_header] + ". " + row[title_header] + ".wav",
            )
            # mp3_name = os.path.splitext(file_name)[0] + ".mp3"
            mp3_name = row[index_number_header] + ". " + row[title_header] + ".mp3"
            mp3_path = os.path.join(AUDIO_FILES_DIR_PATH, "mp3", mp3_name)
            print(file_name)
            print(mp3_path)
            shutil.copy2(wav_path, wav_renamed)

            if CONVERT_FROM_WAV_TO_MP3:
                sound = AudioSegment.from_wav(wav_path)
                sound.export(
                    mp3_path,
                    format="mp3",
                    bitrate="320k",
                    parameters=[
                        "-codec:a",
                        "libmp3lame",  # Force LAME encoder
                        "-b:a",
                        "320k",  # Set CBR bitrate
                        "-write_xing",
                        "0",  # Disable VBR header to ensure CBR
                    ],
                )

            # audio_file = eyed3.load( os.path.join(AUDIO_FILES_DIR_PATH, "І.П. Піцуха (1905 г.н.) – Барынька.mp3"))
            # print(audio_file)
            # print(audio_file.tag.artist)
            # print(11111111111)
            # print(dir(audio_file.tag))
            # print(222222222222)
            # print(audio_file.tag.__annotations__)

            print(mp3_path)
            audio_file = eyed3.load(mp3_path)

            audio_file.tag.track_num = int(row[index_number_header])

            if title := row[title_header]:
                audio_file.tag.title = title
            if artists := row[artists_header]:
                audio_file.tag.artist = artists
            if album := row[album_header]:
                audio_file.tag.album = album
            if year := row[year_header]:
                audio_file.tag.recording_date = year
            if row[comment_header]:
                # print(comment + '/n' + f'{locality_header}: {row[locality_header]}' + '/n' + f'{instruments_header}: {row[instruments_header]}')

                comment = row[comment_header]
                comment_line = comment if comment.endswith(".") else comment + "."

                locality = row[locality_header]
                locality_line = f'{locality_header}: {locality if locality.endswith(".") else locality + "."}'

                instruments = row[instruments_header]
                instruments_line = f'{instruments_header}: {instruments if instruments.endswith(".") else instruments + "."}'

                full_comment = " ".join(
                    [comment_line, locality_line, instruments_line]
                ).strip()
                print(full_comment)
                audio_file.tag.comments.set(full_comment)

            audio_file.tag.save(encoding="utf-8")
            # os.rename(wav_path, wav_renamed)
            # print(row[artists_header])

#     audiofile.tag.album = audiofile.tag.album.encode('latin1').decode('cp1251').encode('utf-8').decode('utf-8')
#     audiofile.tag.title = audiofile.tag.title.encode('latin1').decode('cp1251').encode('utf-8').decode('utf-8')
#     try:
#         audiofile.tag.comments[0].text = audiofile.tag.comments[0].text.encode('latin1').decode('cp1251').encode('utf-8').decode('utf-8')
#     except UnicodeEncodeError:
#         print("DO NOT TRANSLATE COMMENTS")

#     print(audiofile.tag.artist)
#     print(audiofile.tag.album)
#     print(audiofile.tag.title)
#     print(audiofile.tag.track_num)
#     print(audiofile.tag.comments[0].text)
#     print()

#     audiofile.tag.save(encoding='utf-8')
