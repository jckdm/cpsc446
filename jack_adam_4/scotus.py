import re
import csv

def main():
    head = {}
    c = 0
    with open("SupremeCourt_net.txt", "r") as f:
        for line in f:
            first = line[0]
            second = line[1]
            third = line[2]
            fourth = line[3]
            l = len(line) - 2
            if first.isdigit() or first.isspace() and second.isdigit() and third.isspace() and fourth == '"':
                if first.isspace() and c < 35:
                    head[second] = line[4:l].strip()
                    c += 1
                elif c < 35:
                    num = first + second
                    head[num] = line[4:l].strip()
                    c += 1

    with open("SupremeCourt_net.txt", "r") as f:
        yes = {}
        for line in f:
            first = line[0]
            second = line[1]
            third = line[2]
            fourth = line[3]
            fifth = line[4]

            if ((first.isdigit() or first.isspace()) and second.isdigit() and third.isspace() and fourth.isdigit() and fifth.isdigit() and not re.search("Yes", line)):
                if first.isspace():
                    key = second
                else:
                    key = first + second
                yes.setdefault(key, [])
                yes[key].append(fourth + fifth)
            elif re.search("No", line):
                break;

    with open("SupremeCourt_net.txt", "r") as f:
        nos = {}
        flag = True
        for line in f:
            first = line[0]
            second = line[1]
            third = line[2]
            fourth = line[3]
            fifth = line[4]

            if re.search("Yes", line):
                flag = False
            if re.search("No", line):
                flag = True
            if (flag == True and (first.isdigit() or first.isspace()) and second.isdigit() and third.isspace() and fourth.isdigit() and fifth.isdigit() and not re.search("Yes", line)):
                key = first + second
                nos.setdefault(key, [])
                nos[first + second].append(fourth + fifth)
            elif re.search("Abstention", line):
                break;

    abs = {}
    abs["14"] = "27"

    with open('SCOTUS.csv', 'w') as csvfile:
        fieldnames = ['ID', 'casejudge', 'case', 'Breyer', 'Ginsburg', 'Souter', 'Stevens', 'OConnor', 'Kennedy', 'Rehnquist', 'Thomas', 'Scalia']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        case = 1
        Br = 0
        Gi = 0
        So = 0
        St = 0
        Oc = 0
        Ke = 0
        Reh = 0
        Th = 0
        Sc = 0

        writer.writeheader()
        for row in head:
            if int(row) < 27:
                if row == '14':
                    Br = ''
                if '27' in yes[row]:
                    Br = 1
                if '28' in yes[row]:
                    Gi = 1
                if '29' in yes[row]:
                    So = 1
                if '30' in yes[row]:
                    St = 1
                if '31' in yes[row]:
                    Oc = 1
                if '32' in yes[row]:
                    Ke = 1
                if '33' in yes[row]:
                    Reh = 1
                if '34' in yes[row]:
                    Th = 1
                if '35' in yes[row]:
                    Sc = 1
            elif int(row) >= 27:
                Br = ''
                Gi = ''
                So = ''
                St = ''
                Oc = ''
                Ke = ''
                Reh = ''
                Th = ''
                Sc = ''
            if row == "27":
                case = 0
            writer.writerow({"ID": row, "casejudge": head[row], "case": case, "Breyer": Br, "Ginsburg": Gi, "Souter": So, "Stevens": St, "OConnor": Oc, "Kennedy": Ke, "Rehnquist": Reh, "Thomas": Th, "Scalia": Sc})
            Br = 0
            Gi = 0
            So = 0
            St = 0
            Oc = 0
            Ke = 0
            Reh = 0
            Th = 0
            Sc = 0


if __name__ == "__main__":
    main()
