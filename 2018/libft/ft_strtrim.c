/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strtrim.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/14 17:28:28 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/14 17:35:50 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strtrim(char const *s)
{
	size_t size;
	size_t i;
	size_t start;

	if (s)
	{
		size = ft_strlen(s) - 1;
		i = 0;
		while (s[i] == ' ' || s[i] == '\t' || s[i] == '\n')
			i++;
		if (s[i] == '\0')
			return (ft_strdup(""));
		start = i;
		while (s[i])
			i++;
		while (s[size] == ' ' || s[size] == '\t' || s[size] == '\n')
			size--;
		return (ft_strsub(s, start, size - start + 1));
	}
	return (NULL);
}
