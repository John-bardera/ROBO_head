# coding:utf-8

import numpy as np
import pyaudio

CHUNK = 1024
# RATE = 44100
RATE = 16000

MAGNIFICATION = 32

# for index in range(0, p.get_device_count()):
#  print(p.get_device_info_by_index(index))
# で確認する
INPUT_DEVICE_INDEX = 1
OUTPUT_DEVICE_INDEX = 3

p = pyaudio.PyAudio()

stream = p.open(format=pyaudio.paInt16,
                channels=1,
                rate=RATE,
                frames_per_buffer=CHUNK,
                input=True,
                output=True,
                input_device_index=INPUT_DEVICE_INDEX,
                output_device_index=OUTPUT_DEVICE_INDEX)

while stream.is_active():
    input_data = stream.read(CHUNK)
    np_data = np.frombuffer(input_data, dtype=np.int16) * MAGNIFICATION
    np_data[np_data<=300] = 0
    output_data = stream.write(np_data.tobytes())

stream.stop_stream()
stream.close()
p.terminate()
