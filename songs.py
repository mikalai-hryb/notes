import eyed3
import os

path = "/media/mikalai/KALIADY2/mp3/"
files = os.listdir(path)
for _, file in enumerate(files):
    if not file.endswith("mp3"):
        continue
    print(file)

    audiofile = eyed3.load(
        os.path.join(path, file),
    )
    audiofile.tag.artist = (
        audiofile.tag.artist.encode("latin1")
        .decode("cp1251")
        .encode("utf-8")
        .decode("utf-8")
    )
    audiofile.tag.album = (
        audiofile.tag.album.encode("latin1")
        .decode("cp1251")
        .encode("utf-8")
        .decode("utf-8")
    )
    audiofile.tag.title = (
        audiofile.tag.title.encode("latin1")
        .decode("cp1251")
        .encode("utf-8")
        .decode("utf-8")
    )
    try:
        audiofile.tag.comments[0].text = (
            audiofile.tag.comments[0]
            .text.encode("latin1")
            .decode("cp1251")
            .encode("utf-8")
            .decode("utf-8")
        )
    except UnicodeEncodeError:
        print("DO NOT TRANSLATE COMMENTS")

    print(audiofile.tag.artist)
    print(audiofile.tag.album)
    print(audiofile.tag.title)
    print(audiofile.tag.track_num)
    print(audiofile.tag.comments[0].text)
    print()

    audiofile.tag.save(encoding="utf-8")
