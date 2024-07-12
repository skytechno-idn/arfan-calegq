import json
import uuid

# Path ke file JSON
json_file = 'tps.json'  # Ganti dengan nama file JSON Anda dan path jika perlu

# Fungsi untuk generate password menggunakan AES (diabaikan untuk contoh ini)
def generate_password():
    return "U2FsdGVkX19A5l9Jau6oCslxe6Ffbnq6mYb9vXFsLIg="

# Fungsi untuk menghasilkan nama saksi
def generate_nama_saksi(nama_tps):
    return f"SAKSI-{nama_tps}"

# Fungsi untuk menghasilkan email saksi
def generate_email_saksi(id_tps):
    return f"saksi{id_tps}@gmail.com"

# Fungsi untuk membaca file JSON
def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

try:
    # Baca file JSON
    tps_data = read_json(json_file)

    # Buat variabel untuk menyimpan query SQL
    sql_queries = []

    # Iterasi melalui data TPS
    for tps in tps_data:
        # Buat data saksi sesuai format yang diminta
        saksi = {
            "id": str(uuid.uuid4()),  # Generate UUID untuk id saksi
            "nama_saksi": generate_nama_saksi(tps['nama_tps']),
            "email_saksi": generate_email_saksi(tps['id']),
            "telp_saksi": "000000001",
            "password": generate_password(),
            "id_tps": tps['id'],
            "id_kecamatan": tps['id_kecamatan'],
            "createdAt": tps['createdAt'],
            "updatedAt": tps['updatedAt']
        }

        # Buat query SQL INSERT dalam format teks
        sql_query = f"""
        INSERT INTO Saksis (id, nama_saksi, email_saksi, telp_saksi, password, id_tps, id_kecamatan, createdAt, updatedAt)
        VALUES ('{saksi['id']}', '{saksi['nama_saksi']}', '{saksi['email_saksi']}', '{saksi['telp_saksi']}', '{saksi['password']}',
                '{saksi['id_tps']}', '{saksi['id_kecamatan']}', '{saksi['createdAt']}', '{saksi['updatedAt']}');
        """

        # Tambahkan query SQL ke daftar sql_queries
        sql_queries.append(sql_query)

    # Cetak semua query SQL
    for query in sql_queries:
        print(query)

    # Outputkan hasil query SQL ke file jika diperlukan
    with open('insert_queries.sql', 'w') as file:
        for query in sql_queries:
            file.write(query + '\n')

    print(f"Query SQL telah di-generate dan disimpan di file 'insert_queries.sql'")

except FileNotFoundError:
    print(f'File "{json_file}" tidak ditemukan')
except json.JSONDecodeError as e:
    print(f'Error parsing JSON: {e}')
except Exception as e:
    print(f'Terjadi kesalahan: {e}')
