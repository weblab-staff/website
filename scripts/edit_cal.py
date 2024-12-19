
# Script to edit calendar.ics file and change year / date


def editline(s):
	mid = s[0:8]

	year = mid[0:4]
	month = mid[4:6]
	day = mid[6:8]

	day = str(int(day) - 1)
	if len(day) == 1:
		day = "0" + day

	year = "2025"
	res = year + month + day + s[8:]
	print(res)

	return res

with open('out.ics', "w+") as out, open("MIT web.lab Public Calendar 2025_cc1fa1082653a6746650dce3a7403bfcdd6c898294210579915103e4c450d3e2@group.calendar.google.com.ics", "r") as inp:
	for line in inp:

		fields = ["DTSTART:", "DTEND:"]

		new_line = line

		for field in fields:
			if line.startswith(field):
				new_line = field + editline(line[len(field):])
				break
		out.write(new_line)

		

		

