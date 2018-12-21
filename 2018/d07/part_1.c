#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include "header.h"
#include "libft.h"

static int	ft_build_list(t_ins **list, char **line)
{
	int 		i;
	char 		*puzzle_line;
	t_ins 	*element;
	t_ins 	*tmp_list;

	puzzle_line = (*line);
	if (puzzle_line)
	{
		// Go to the end of the list
		tmp_list = (*list);
		while (tmp_list && tmp_list->next)
			tmp_list = tmp_list->next;
		// Build a new point
		i = 0;
		if ((element = (t_ins*)malloc(sizeof(t_ins))))
		{
			element->must_finished = puzzle_line[5];
			element->can_begin = puzzle_line[36];
			element->is_placed = 0;
			element->next = NULL;
		}
		else
			return (0);
		if (tmp_list)
			tmp_list->next = element;
		else
			(*list) = element;
	}
	return (1);
}

static char 	ft_get_final_letter(t_ins **list)
{
		t_ins *col_left;
		t_ins *col_right;
		char 	letter;

		if (list)
		{
			col_right = *list;
			while (col_right)
			{
				letter = col_right->can_begin;
				col_left = *list;
				while ((col_left && col_left->must_finished != letter))
					col_left = col_left->next;
				if ((col_left && col_left->must_finished == letter))
					col_right = col_right->next;
				else if (!col_left)
					break;
			}
			return (letter);
		}
		return (0);
}

static int 		ft_count_previous_letters(t_ins **list, char next_letter)
{
	t_ins 	*tmp;
	int 		corresponding_letters;

	corresponding_letters = 0;
	tmp = *list;
	while (tmp)
	{
		if (tmp->can_begin == next_letter)
			corresponding_letters++;
		tmp = tmp->next;
	}
	return (corresponding_letters);
}

static char 	ft_search_previous_letter(t_ins **list, char next_letter)
{
	t_ins 	*tmp;
	char 		previous_letter;

	previous_letter = 'A';
	tmp = *list;
	while (tmp)
	{
		if (tmp->can_begin == next_letter && tmp->is_placed == 0)
			previous_letter = (tmp->must_finished > previous_letter) ? tmp->must_finished : previous_letter;
		tmp = tmp->next;
	}
	return (previous_letter);
}

static void 	ft_place_letter(char letter, char next_letter, t_ins **list)
{
	t_ins *tmp;

	tmp = *list;
	while (tmp)
	{
		if (tmp->can_begin == next_letter && tmp->must_finished == letter && tmp->is_placed == 0)
			break ;
		tmp = tmp->next;
	}
	if (tmp)
		tmp->is_placed = 1;
}

#include <stdio.h>

int	main(void)
{
	int 			fd;
	char 			*line;
	t_ins 		*list;
	t_ins 		*tmp;
	int 	 		corresponding_letters;
	int 			count;
	char      *result;
	char 			last_letter;
	char 			previous_letter;

	count = 0;
	list = NULL;
	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		if (!(ft_build_list(&list, &line)))
			return (-1);
		ft_strdel(&line);
		count++;
	}
	close(fd);

	// Prepare result array
	if ((result = (char*)malloc(sizeof(char) * (count))))
	{
		result[--count] = '\0';

		// Find the ultimate letter beggining & place it at the end of the results
		result[--count] = ft_get_final_letter(&list);

		tmp = list;
		while (tmp)
		{
			// Get the last letter place in the result array
			last_letter = result[count];

			// Count number of letter that must be finished before last letter begins
			// and should be placed in the result array before it.
			corresponding_letters = ft_count_previous_letters(&list, last_letter);

			// In this set of letters, place these letters in inverse alphabetical order in the resul array
			while (corresponding_letters--)
			{
				// Search for corresponding letters and retain only the last one in alphabet
				previous_letter = ft_search_previous_letter(&list, last_letter);

				// Place this letter at the end of the array && set this letter as placed in the list
				if ((count--))
				{
					result[count] = previous_letter;
					ft_place_letter(previous_letter, last_letter, &list);
				}
			}
			tmp = tmp->next;
		}
		printf("%s", result);
	}
	return (0);
}
