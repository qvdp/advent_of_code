/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsplit.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 19:03:06 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/19 16:36:35 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdlib.h>

static size_t	ft_words(char const *s, char c)
{
	size_t		i;
	size_t		count;

	i = 0;
	count = 0;
	while (s[i])
	{
		while (s[i] == c && s[i])
			i++;
		if (s[i])
			count++;
		while (s[i] != c && s[i])
			i++;
	}
	return (count);
}

char			**ft_strsplit(char const *s, char c)
{
	char		**tab;
	size_t		words;
	size_t		count;
	size_t		len;

	if (!s)
		return (NULL);
	words = ft_words(s, c);
	if (!(tab = (char**)malloc(sizeof(char*) * (words + 1))))
		return (NULL);
	count = 0;
	while (words--)
	{
		while (*s == c && *s != '\0')
			s++;
		len = 0;
		while (s[len] != c && s[len] != '\0')
			len++;
		tab[count] = ft_strsub((char*)s, 0, len);
		s += len;
		count++;
	}
	tab[count] = NULL;
	return (tab);
}
