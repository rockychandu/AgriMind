import os
import sys

def count_python_sloc(root_dir):
    total_files = 0
    total_lines = 0
    sloc_lines = 0
    comment_lines = 0
    empty_lines = 0

    file_breakdown = []

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Ignore venv, __pycache__, .git, node_modules, dist
        dirnames[:] = [d for d in dirnames if d not in ('__pycache__', '.git', 'venv', 'node_modules', 'dist', '.idea')]
        for filename in filenames:
            if filename.endswith('.py'):
                filepath = os.path.join(dirpath, filename)
                total_files += 1
                
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                
                f_sloc = 0
                f_comment = 0
                f_empty = 0
                in_multiline_docstring = False

                for line in lines:
                    total_lines += 1
                    stripped = line.strip()
                    if not stripped:
                        empty_lines += 1
                        f_empty += 1
                        continue

                    if stripped.startswith('"""') or stripped.startswith("'''"):
                        if stripped.count('"""') == 2 or stripped.count("'''") == 2:
                            comment_lines += 1
                            f_comment += 1
                            continue
                        in_multiline_docstring = not in_multiline_docstring
                        comment_lines += 1
                        f_comment += 1
                        continue

                    if in_multiline_docstring:
                        comment_lines += 1
                        f_comment += 1
                        continue

                    if stripped.startswith('#'):
                        comment_lines += 1
                        f_comment += 1
                        continue

                    sloc_lines += 1
                    f_sloc += 1

                rel_path = os.path.relpath(filepath, root_dir)
                file_breakdown.append((rel_path, f_sloc, f_comment, f_empty, len(lines)))

    return total_files, sloc_lines, comment_lines, empty_lines, total_lines, file_breakdown

if __name__ == '__main__':
    target_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    if len(sys.argv) > 1:
        target_directory = sys.argv[1]
        
    t_files, sloc, comments, empties, total, breakdown = count_python_sloc(target_directory)
    print(f"=== Python Source Code Line Count Summary ===")
    print(f"Directory: {target_directory}")
    print(f"Total Python Files: {t_files}")
    print(f"Source Lines of Code (SLOC - non-empty, non-comment): {sloc}")
    print(f"Comment Lines: {comments}")
    print(f"Empty Lines: {empties}")
    print(f"Total Lines: {total}")
    print("=============================================")
