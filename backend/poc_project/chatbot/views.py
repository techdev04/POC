from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

@api_view(["GET"])
def health(request):
    return Response({"status": "ok", "time": datetime.utcnow().isoformat() + "Z"})

@api_view(["POST"])
def echo(request):
    """
    Expected JSON: {"message": "hello world"}
    Returns: {"received": "hello world", "upper": "HELLO WORLD", "at": "..."}
    """
    message = request.data.get("message")
    if not message:
        return Response({"error": "message is required"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        "received": message,
        "upper": message.upper(),
        "at": datetime.utcnow().isoformat() + "Z",
    })
