import os
import sys
import tempfile
import json
import whisper  # openai-whisper
from moviepy.editor import VideoFileClip


def transcribe_video_to_json(video_path):
    """
    Transcribes a video file and returns a JSON string with the result.
    Outputs JSON: {"transcription": "text"} or {"error": "message"}
    """
    if not os.path.exists(video_path):
        return json.dumps({"error": f"Video file not found at {video_path}"})

    temp_audio_path = None  # Initialize to ensure it's defined for finally block
    try:
        # 1. Extract audio using MoviePy
        video = VideoFileClip(video_path)
        audio = video.audio

        # Create a temporary WAV file for Whisper
        # Whisper works best with WAV files.
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_audio_file:
            temp_audio_path = tmp_audio_file.name

        audio.write_audiofile(temp_audio_path, codec='pcm_s16le')
        audio.close()
        video.close()

        # 2. Transcribe audio using Whisper
        # You can choose different model sizes: "tiny", "base", "small", "medium", "large"
        # "base" is a good starting point. Larger models are more accurate but slower and require more resources.
        model = whisper.load_model("base")
        result = model.transcribe(temp_audio_path, fp16=False)  # fp16=False can improve compatibility on CPU

        transcription_text = result["text"]
        return json.dumps({"transcription": transcription_text})

    except Exception as e:
        return json.dumps({"error": f"An error occurred: {str(e)}"})
    finally:
        # 3. Clean up temporary audio file
        if temp_audio_path and os.path.exists(temp_audio_path):
            try:
                os.remove(temp_audio_path)
            except Exception as e_clean:
                # Log this error but don't let it overshadow the main error if one occurred
                sys.stderr.write(f"Error removing temporary file {temp_audio_path}: {e_clean}\n")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        # Output error as JSON to stderr if no argument is provided, or print usage
        sys.stderr.write(json.dumps({"error": "Usage: python transcribe_video.py <path_to_video_file>"}) + "\n")
        sys.exit(1)

    video_file_path = sys.argv[1]
    transcription_json = transcribe_video_to_json(video_file_path)
    print(transcription_json)  # Print JSON result to stdout for Node.js to capture