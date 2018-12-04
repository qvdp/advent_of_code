/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strrchr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 20:29:37 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 20:29:42 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strrchr(const char *s, int c)
{
	size_t length;

	length = ft_strlen(s);
	if (s)
	{
		while (length != 0 && s[length] != (char)c)
			length--;
		if (s[length] == (char)c)
			return ((char*)&s[length]);
	}
	return (NULL);
}
