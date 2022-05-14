import socket
import struct

def get_ip_int(ip):
    return socket.ntohl(struct.unpack('I',socket.inet_aton(str(ip)))[0])

def get_ip_str(ip):
    return socket.inet_ntoa(struct.pack("I",socket.htonl(ip)))